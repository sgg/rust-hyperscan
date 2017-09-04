use std::ptr;
use std::mem;
use std::ops::Deref;
use std::os::raw::c_char;
use std::ffi::CStr;

use libc;

use constants::*;
use raw::*;
use errors::Result;

/// Raw `Database` pointer
pub type RawDatabasePtr = *mut hs_database_t;

/// A Hyperscan pattern database.
pub trait Database: Deref<Target = RawDatabasePtr> {
    /// Provides the id of compiled mode of the given database.
    fn database_mode(&self) -> CompileMode;

    /// Provides the name of compiled mode of the given database.
    fn database_name(&self) -> &'static str;

    /// Provides the size of the given database in bytes.
    fn database_size(&self) -> Result<usize>;

    /// Utility function providing information about a database.
    fn database_info(&self) -> Result<String>;
}

/// A pattern database can be serialized to a stream of bytes.
pub trait SerializableDatabase<T: SerializedDatabase>
where
    Self: Database + Sized,
{
    /// Serialize a pattern database to a stream of bytes.
    fn serialize(&self) -> Result<T>;

    /// Reconstruct a pattern database from a stream of bytes
    /// previously generated by RawDatabase::serialize().
    fn deserialize(bytes: &[u8]) -> Result<Self>;

    /// Reconstruct a pattern database from a stream of bytes
    /// previously generated by RawDatabase::serialize() at a given memory location.
    fn deserialize_at(&self, bytes: &[u8]) -> Result<&Self>;
}

/// A pattern database was serialized to a stream of bytes.
pub trait SerializedDatabase: AsRef<[u8]> {
    fn deserialize<T: SerializableDatabase<S>, S: SerializedDatabase>(&self) -> Result<T> {
        T::deserialize(self.as_ref())
    }

    fn database_size(&self) -> Result<usize> {
        let buf = self.as_ref();
        let mut size: usize = 0;

        unsafe {
            check_hs_error!(hs_serialized_database_size(
                buf.as_ptr() as *const i8,
                buf.len(),
                &mut size,
            ));
        }

        Ok(size)
    }

    fn database_info(&self) -> Result<String> {
        let buf = self.as_ref();
        let mut p: *mut c_char = ptr::null_mut();

        unsafe {
            check_hs_error!(hs_serialized_database_info(
                buf.as_ptr() as *const i8,
                buf.len(),
                &mut p,
            ));

            let result = match CStr::from_ptr(p).to_str() {
                Ok(info) => Ok(info.to_string()),
                Err(_) => bail!(hs_error!(Invalid)),
            };

            libc::free(p as *mut libc::c_void);

            result
        }
    }
}

/// A type containing information on the target platform
/// which may optionally be provided to the compile calls
#[derive(Debug)]
pub struct PlatformInfo(RawPlatformInfo);

/// Raw `PlatformInfo` pointer
pub type RawPlatformInfo = hs_platform_info_t;
pub type RawPlatformInfoPtr = *const hs_platform_info_t;

impl PlatformInfo {
    pub fn is_valid() -> bool {
        unsafe { hs_valid_platform() == HS_SUCCESS }
    }

    pub fn populate() -> Result<PlatformInfo> {
        let mut platform_info = unsafe { mem::zeroed() };

        check_hs_error!(unsafe { hs_populate_platform(&mut platform_info) });

        Ok(PlatformInfo(platform_info))
    }

    pub fn new(tune: TuneFamily, cpu_features: CpuFeatures) -> PlatformInfo {
        PlatformInfo(RawPlatformInfo {
            tune: tune,
            cpu_features: cpu_features.bits(),
            reserved1: 0,
            reserved2: 0,
        })
    }

    pub fn as_raw(&self) -> RawPlatformInfoPtr {
        &self.0
    }
}

/// The regular expression pattern database builder.
pub trait DatabaseBuilder<D: Database> {
    /// This is the function call with which an expression is compiled into
    /// a Hyperscan database which can be passed to the runtime functions
    fn build(&self) -> Result<D> {
        self.build_for_platform(PlatformInfo::populate().ok().as_ref())
    }

    fn build_for_platform(&self, platform: Option<&PlatformInfo>) -> Result<D>;
}

pub type RawExpressionInfoPtr = *mut hs_expr_info_t;

/// A type containing information related to an expression
#[derive(Debug)]
pub struct ExpressionInfo(RawExpressionInfoPtr);

impl Drop for ExpressionInfo {
    fn drop(&mut self) {
        unsafe { libc::free(self.0 as *mut libc::c_void) }
    }
}

impl From<RawExpressionInfoPtr> for ExpressionInfo {
    fn from(info: RawExpressionInfoPtr) -> Self {
        ExpressionInfo(info)
    }
}

impl ExpressionInfo {
    /// The minimum length in bytes of a match for the pattern.
    pub fn min_width(&self) -> usize {
        unsafe { (*self.0).min_width as usize }
    }

    /// The maximum length in bytes of a match for the pattern.
    pub fn max_width(&self) -> usize {
        unsafe { (*self.0).max_width as usize }
    }

    /// Whether this expression can produce matches that are not returned in order,
    /// such as those produced by assertions.
    pub fn unordered_matches(&self) -> bool {
        unsafe { (*self.0).unordered_matches != 0 }
    }

    /// Whether this expression can produce matches at end of data (EOD).
    pub fn matches_at_eod(&self) -> bool {
        unsafe { (*self.0).matches_at_eod != 0 }
    }

    /// Whether this expression can *only* produce matches at end of data (EOD).
    pub fn matches_only_at_eod(&self) -> bool {
        unsafe { (*self.0).matches_only_at_eod != 0 }
    }
}

/// Providing expression information.
pub trait Expression {
    ///
    /// Utility function providing information about a regular expression.
    ///
    /// The information provided in ExpressionInfo
    /// includes the minimum and maximum width of a pattern match.
    ///
    fn info(&self) -> Result<ExpressionInfo>;
}

/// Raw `Scratch` pointer
pub type RawScratchPtr = *mut hs_scratch_t;

/// A Hyperscan scratch space.
///
pub trait Scratch: Deref<Target = RawScratchPtr> {
    /// Provides the size of the given scratch space.
    fn size(&self) -> Result<usize>;

    /// Reallocate a "scratch" space for use by Hyperscan.
    fn realloc<T: Database>(&mut self, db: &T) -> Result<&Self>;
}

/// `Scratch` allocator
pub trait ScratchAllocator<S: Scratch> {
    /// Allocate a "scratch" space for use by Hyperscan.
    fn alloc(&self) -> Result<S>;

    /// Reallocate a "scratch" space for use by Hyperscan.
    fn realloc(&self, s: &mut S) -> Result<&Self>;
}

/// A byte stream can be matched
///
pub trait Scannable {
    fn as_bytes(&self) -> &[u8];
}

impl<'a> Scannable for &'a [u8] {
    fn as_bytes(&self) -> &[u8] {
        &self
    }
}
impl<'a> Scannable for &'a str {
    fn as_bytes(&self) -> &[u8] {
        str::as_bytes(self)
    }
}
impl<'a> Scannable for &'a String {
    fn as_bytes(&self) -> &[u8] {
        self.as_str().as_bytes()
    }
}
impl<'a> Scannable for &'a Vec<u8> {
    fn as_bytes(&self) -> &[u8] {
        &self
    }
}

/// Flags modifying the behaviour of scan function
pub type ScanFlags = u32;

/// Definition of the match event callback function type.
///
/// This callback function will be invoked whenever a match is located in the
/// target data during the execution of a scan. The details of the match are
/// passed in as parameters to the callback function, and the callback function
/// should return a value indicating whether or not matching should continue on
/// the target data. If no callbacks are desired from a scan call, NULL may be
/// provided in order to suppress match production.
///
/// This callback function should not attempt to call Hyperscan API functions on
/// the same stream nor should it attempt to reuse the scratch space allocated
/// for the API calls that caused it to be triggered. Making another call to the
/// Hyperscan library with completely independent parameters should work (for
/// example, scanning a different database in a new stream and with new scratch
/// space), but reusing data structures like stream state and/or scratch space
/// will produce undefined behavior.
///
/// Fn(id: u32, from: u64, to: u64, flags: u32) -> bool
///
pub type MatchEventCallback<D> = fn(id: u32, from: u64, to: u64, flags: u32, data: &D) -> u32;
pub type MatchEventCallbackMut<D> = fn(id: u32, from: u64, to: u64, flags: u32, data: &mut D) -> u32;

/// The block (non-streaming) regular expression scanner.
pub trait BlockScanner<T: Scannable, S: Scratch> {
    /// This is the function call in which the actual pattern matching
    /// takes place for block-mode pattern databases.
    fn scan<D>(
        &self,
        data: T,
        flags: ScanFlags,
        scratch: &S,
        callback: Option<MatchEventCallback<D>>,
        context: Option<&D>,
    ) -> Result<&Self>;

    fn scan_mut<D>(
        &mut self,
        data: T,
        flags: ScanFlags,
        scratch: &S,
        callback: Option<MatchEventCallbackMut<D>>,
        context: Option<&mut D>,
    ) -> Result<&Self> {
        self.scan(
            data,
            flags,
            scratch,
            callback.map(|f| unsafe {
                mem::transmute::<MatchEventCallbackMut<D>, MatchEventCallback<D>>(f)
            }),
            context.map(|v| &*v),
        )
    }
}

/// The vectored regular expression scanner.
pub trait VectoredScanner<T: Scannable, S: Scratch> {
    /// This is the function call in which the actual pattern matching
    /// takes place for vectoring-mode pattern databases.
    fn scan<D>(
        &self,
        data: &Vec<T>,
        flags: ScanFlags,
        scratch: &S,
        callback: Option<MatchEventCallback<D>>,
        context: Option<&D>,
    ) -> Result<&Self>;
}

/// Raw `Stream` pointer
pub type RawStreamPtr = *mut hs_stream_t;

/// Flags modifying the behaviour of the stream.
pub type StreamFlags = u32;

/// The stream returned by StreamingDatabase::open_stream
pub trait Stream<S: Scratch>: Deref<Target = RawStreamPtr> {
    /// Close a stream.
    fn close<D>(&self, scratch: &S, callback: Option<MatchEventCallback<D>>, context: Option<&D>) -> Result<&Self>;

    /// Reset a stream to an initial state.
    fn reset<D>(
        &self,
        flags: StreamFlags,
        scratch: &S,
        callback: Option<MatchEventCallback<D>>,
        context: Option<&D>,
    ) -> Result<&Self>;
}

/// The streaming regular expression scanner.
pub trait StreamingScanner<T, S>
where
    T: Stream<S>,
    S: Scratch,
{
    /// Open and initialise a stream.
    fn open_stream(&self, flags: StreamFlags) -> Result<T>;
}
