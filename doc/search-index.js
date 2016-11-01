var searchIndex = {};
searchIndex["hyperscan"] = {"doc":"Hyperscan is a high-performance regular expression matching library.","items":[[3,"PlatformInfo","hyperscan","A type containing information on the target platform\nwhich may optionally be provided to the compile calls",null,null],[3,"ExpressionInfo","","A type containing information related to an expression",null,null],[12,"min_width","","The minimum length in bytes of a match for the pattern.",0,null],[12,"max_width","","The maximum length in bytes of a match for the pattern.",0,null],[12,"unordered_matches","","Whether this expression can produce matches that are not returned in order,\nsuch as those produced by assertions.",0,null],[12,"matches_at_eod","","Whether this expression can produce matches at end of data (EOD).",0,null],[12,"matches_only_at_eod","","Whether this expression can *only* produce matches at end of data (EOD).",0,null],[3,"RawDatabase","","A compiled pattern database that can then be used to scan data.",null,null],[3,"CompileFlags","","Flags which modify the behaviour of the expression.",null,null],[12,"0","","",1,null],[3,"Pattern","","Pattern that has matched.",null,null],[12,"expression","","The NULL-terminated expression to parse.",2,null],[12,"flags","","Flags which modify the behaviour of the expression.",2,null],[12,"id","","ID number to be associated with the corresponding pattern in the expressions array.",2,null],[3,"RawScratch","","A large enough region of scratch space to support a given database.",null,null],[3,"RawStream","","A pattern matching state can be maintained across multiple blocks of target data",null,null],[4,"Block","","Block scan (non-streaming) database.",null,null],[4,"Streaming","","Streaming database.",null,null],[4,"Vectored","","Vectored scanning database.",null,null],[4,"Error","","Error Codes",null,null],[13,"Invalid","","A parameter passed to this function was invalid.",3,null],[13,"NoMem","","A memory allocation failed.",3,null],[13,"ScanTerminated","","The engine was terminated by callback.",3,null],[13,"CompilerError","","The pattern compiler failed with more detail.",3,null],[13,"DbVersionError","","The given database was built for a different version of Hyperscan.",3,null],[13,"DbPlatformError","","The given database was built for a different platform (i.e., CPU type).",3,null],[13,"DbModeError","","The given database was built for a different mode of operation.\nThis error is returned when streaming calls are used\nwith a block or vectored database and vice versa.",3,null],[13,"BadAlign","","A parameter passed to this function was not correctly aligned.",3,null],[13,"BadAlloc","","The memory allocator (either malloc() or the allocator set with hs_set_allocator())\ndid not correctly return memory suitably aligned\nfor the largest representable data type on this platform.",3,null],[13,"Failed","","Unknown error code",3,null],[13,"ParseError","","An error which can be returned when parsing an integer.",3,null],[13,"NulError","","An error returned from CString::new to indicate\nthat a nul byte was found in the vector provided.",3,null],[11,"clone","","",3,null],[11,"eq","","",3,null],[11,"ne","","",3,null],[11,"fmt","","",3,null],[11,"from","","",3,{"inputs":[{"name":"i32"}],"output":{"name":"error"}}],[11,"from","","",3,{"inputs":[{"name":"parseinterror"}],"output":{"name":"error"}}],[11,"from","","",3,{"inputs":[{"name":"nulerror"}],"output":{"name":"error"}}],[11,"fmt","","",3,null],[11,"description","","",3,null],[11,"fmt","","",4,null],[11,"fmt","","",5,null],[11,"fmt","","",6,null],[11,"mode","","",4,{"inputs":[],"output":{"name":"u32"}}],[11,"name","","",4,{"inputs":[],"output":{"name":"str"}}],[11,"mode","","",5,{"inputs":[],"output":{"name":"u32"}}],[11,"name","","",5,{"inputs":[],"output":{"name":"str"}}],[11,"mode","","",6,{"inputs":[],"output":{"name":"u32"}}],[11,"name","","",6,{"inputs":[],"output":{"name":"str"}}],[11,"fmt","","",7,null],[11,"null","","",7,{"inputs":[],"output":{"name":"platforminfo"}}],[11,"host","","",7,{"inputs":[],"output":{"name":"platforminfo"}}],[11,"new","","",7,{"inputs":[{"name":"u32"},{"name":"u64"}],"output":{"name":"platforminfo"}}],[11,"as_ptr","","",7,null],[11,"clone","","",0,null],[11,"fmt","","",0,null],[11,"fmt","","",8,null],[11,"from_raw","","Constructs a compiled pattern database from a raw pointer.",8,{"inputs":[{"name":"rawdatabaseptr"}],"output":{"name":"rawdatabase"}}],[11,"free","","Free a compiled pattern database.",8,null],[11,"deref","","",8,null],[11,"database_mode","","",8,null],[11,"database_name","","",8,null],[11,"database_size","","",8,null],[11,"database_info","","",8,null],[11,"serialize","","",8,null],[11,"deserialize","","",8,null],[11,"deserialize_at","","",8,null],[11,"drop","","",8,null],[11,"stream_size","","",8,null],[11,"eq","","",1,null],[11,"ne","","",1,null],[11,"clone","","",1,null],[11,"default","","",1,{"inputs":[],"output":{"name":"compileflags"}}],[11,"fmt","","",1,null],[11,"from","","",1,{"inputs":[{"name":"u32"}],"output":{"name":"self"}}],[11,"into","","",1,null],[11,"fmt","","",1,null],[11,"is_set","","",1,null],[11,"set","","",1,null],[11,"parse","","",1,{"inputs":[{"name":"str"}],"output":{"name":"result"}}],[11,"from_str","","",1,{"inputs":[{"name":"str"}],"output":{"name":"result"}}],[11,"clone","","",2,null],[11,"fmt","","",2,null],[11,"parse","","",2,{"inputs":[{"name":"str"}],"output":{"name":"result"}}],[11,"fmt","","",2,null],[11,"from_str","","",2,{"inputs":[{"name":"str"}],"output":{"name":"result"}}],[11,"info","","",2,null],[11,"compile","","The basic regular expression compiler.",8,{"inputs":[{"name":"str"},{"name":"u32"},{"name":"platforminfo"}],"output":{"name":"result"}}],[11,"build_for_platform","","",2,null],[11,"fmt","","",9,null],[11,"drop","","",9,null],[11,"clone","","",9,null],[11,"deref","","",9,null],[11,"size","","",9,null],[11,"realloc","","",9,null],[11,"alloc","","",8,null],[11,"realloc","","",8,null],[11,"fmt","","",10,null],[11,"deref","","",10,null],[11,"deref_mut","","",10,null],[11,"clone","","",10,null],[11,"close","","",10,null],[11,"reset","","",10,null],[11,"scan","","",10,null],[6,"RawDatabasePtr","","Raw `Database` pointer",null,null],[6,"RawPlatformInfoPtr","","Raw `PlatformInfo` pointer",null,null],[6,"RawScratchPtr","","Raw `Scratch` pointer",null,null],[6,"ScanFlags","","Flags modifying the behaviour of scan function",null,null],[6,"MatchEventCallback","","Definition of the match event callback function type.",null,null],[6,"MatchEventCallbackMut","","",null,null],[6,"RawStreamPtr","","Raw `Stream` pointer",null,null],[6,"StreamFlags","","Flags modifying the behaviour of the stream.",null,null],[6,"BlockDatabase","","Block scan (non-streaming) database.",null,null],[6,"StreamingDatabase","","Streaming database.",null,null],[6,"VectoredDatabase","","Vectored scanning database.",null,null],[6,"Patterns","","Vec of `Pattern`",null,null],[17,"HS_SUCCESS","","The engine completed normally.",null,null],[17,"HS_INVALID","","A parameter passed to this function was invalid.",null,null],[17,"HS_NOMEM","","A memory allocation failed.",null,null],[17,"HS_SCAN_TERMINATED","","The engine was terminated by callback.",null,null],[17,"HS_COMPILER_ERROR","","The pattern compiler failed, and the @ref hs_compile_error_t should be\ninspected for more detail.",null,null],[17,"HS_DB_VERSION_ERROR","","The given database was built for a different version of Hyperscan.",null,null],[17,"HS_DB_PLATFORM_ERROR","","The given database was built for a different platform (i.e., CPU type).",null,null],[17,"HS_DB_MODE_ERROR","","The given database was built for a different mode of operation. This error\nis returned when streaming calls are used with a block or vectored database\nand vice versa.",null,null],[17,"HS_BAD_ALIGN","","A parameter passed to this function was not correctly aligned.",null,null],[17,"HS_BAD_ALLOC","","The memory allocator (either malloc() or the allocator set with @ref\nhs_set_allocator()) did not correctly return memory suitably aligned for the\nlargest representable data type on this platform.",null,null],[17,"HS_MODE_BLOCK","","Compiler mode flag: Block scan (non-streaming) database.",null,null],[17,"HS_MODE_STREAM","","Compiler mode flag: Streaming database.",null,null],[17,"HS_MODE_VECTORED","","Compiler mode flag: Vectored scanning database.",null,null],[17,"HS_MODE_SOM_HORIZON_LARGE","","Compiler mode flag: use full precision to track start of match offsets in\nstream state.",null,null],[17,"HS_MODE_SOM_HORIZON_MEDIUM","","Compiler mode flag: use medium precision to track start of match offsets in\nstream state.",null,null],[17,"HS_MODE_SOM_HORIZON_SMALL","","Compiler mode flag: use limited precision to track start of match offsets in\nstream state.",null,null],[17,"HS_FLAG_CASELESS","","Compile flag: Set case-insensitive matching.",null,null],[17,"HS_FLAG_DOTALL","","Compile flag: Matching a `.` will not exclude newlines.",null,null],[17,"HS_FLAG_MULTILINE","","Compile flag: Set multi-line anchoring.",null,null],[17,"HS_FLAG_SINGLEMATCH","","Compile flag: Set single-match only mode.",null,null],[17,"HS_FLAG_ALLOWEMPTY","","Compile flag: Allow expressions that can match against empty buffers.",null,null],[17,"HS_FLAG_UTF8","","Compile flag: Enable UTF-8 mode for this expression.",null,null],[17,"HS_FLAG_UCP","","Compile flag: Enable Unicode property support for this expression.",null,null],[17,"HS_FLAG_PREFILTER","","Compile flag: Enable prefiltering mode for this expression.",null,null],[17,"HS_FLAG_SOM_LEFTMOST","","Compile flag: Enable leftmost start of match reporting.",null,null],[17,"HS_CPU_FEATURES_AVX2","","CPU features flag - Intel(R) Advanced Vector Extensions 2 (Intel(R) AVX2)",null,null],[17,"HS_TUNE_FAMILY_GENERIC","","Tuning Parameter - Generic",null,null],[17,"HS_TUNE_FAMILY_SNB","","Tuning Parameter - Intel(R) microarchitecture code name Sandy Bridge",null,null],[17,"HS_TUNE_FAMILY_IVB","","Tuning Parameter - Intel(R) microarchitecture code name Ivy Bridge",null,null],[17,"HS_TUNE_FAMILY_HSW","","Tuning Parameter - Intel(R) microarchitecture code name Haswell",null,null],[17,"HS_TUNE_FAMILY_SLM","","Tuning Parameter - Intel(R) microarchitecture code name Silvermont",null,null],[17,"HS_TUNE_FAMILY_BDW","","Tuning Parameter - Intel(R) microarchitecture code name Broadwell",null,null],[8,"Type","","Compile mode",null,null],[10,"mode","","",11,{"inputs":[],"output":{"name":"u32"}}],[10,"name","","",11,{"inputs":[],"output":{"name":"str"}}],[8,"Database","","A Hyperscan pattern database.",null,null],[10,"database_mode","","Provides the id of compiled mode of the given database.",12,null],[10,"database_name","","Provides the name of compiled mode of the given database.",12,null],[10,"database_size","","Provides the size of the given database in bytes.",12,null],[10,"database_info","","Utility function providing information about a database.",12,null],[8,"SerializableDatabase","","A pattern database can be serialized to a stream of bytes.",null,null],[10,"serialize","","Serialize a pattern database to a stream of bytes.",13,null],[10,"deserialize","","Reconstruct a pattern database from a stream of bytes\npreviously generated by RawDatabase::serialize().",13,null],[10,"deserialize_at","","Reconstruct a pattern database from a stream of bytes\npreviously generated by RawDatabase::serialize() at a given memory location.",13,null],[8,"SerializedDatabase","","A pattern database was serialized to a stream of bytes.",null,null],[10,"len","","",14,null],[10,"as_slice","","",14,null],[11,"deserialize","","",14,null],[11,"database_size","","",14,null],[11,"database_info","","",14,null],[8,"DatabaseBuilder","","The regular expression pattern database builder.",null,null],[11,"build","","This is the function call with which an expression is compiled into\na Hyperscan database which can be passed to the runtime functions",15,null],[10,"build_for_platform","","",15,null],[8,"Expression","","Providing expression information.",null,null],[10,"info","","",16,null],[8,"Scratch","","A Hyperscan scratch space.",null,null],[10,"size","","Provides the size of the given scratch space.",17,null],[10,"realloc","","Reallocate a &quot;scratch&quot; space for use by Hyperscan.",17,null],[8,"ScratchAllocator","","`Scratch` allocator",null,null],[10,"alloc","","Allocate a &quot;scratch&quot; space for use by Hyperscan.",18,null],[10,"realloc","","Reallocate a &quot;scratch&quot; space for use by Hyperscan.",18,null],[8,"Scannable","","A byte stream can be matched",null,null],[10,"as_bytes","","",19,null],[8,"BlockScanner","","The block (non-streaming) regular expression scanner.",null,null],[10,"scan","","This is the function call in which the actual pattern matching\ntakes place for block-mode pattern databases.",20,null],[11,"scan_mut","","",20,null],[8,"VectoredScanner","","The vectored regular expression scanner.",null,null],[10,"scan","","This is the function call in which the actual pattern matching\ntakes place for vectoring-mode pattern databases.",21,null],[8,"Stream","","The stream returned by StreamingDatabase::open_stream",null,null],[10,"close","","Close a stream.",22,null],[10,"reset","","Reset a stream to an initial state.",22,null],[8,"StreamingScanner","","The streaming regular expression scanner.",null,null],[10,"open_stream","","Open and initialise a stream.",23,null],[14,"pattern!","","Define `Pattern` with flags",null,null],[14,"patterns!","","Define multi `Pattern` with flags and ID",null,null],[11,"deserialize","","",14,null],[11,"database_size","","",14,null],[11,"database_info","","",14,null],[11,"build","","This is the function call with which an expression is compiled into\na Hyperscan database which can be passed to the runtime functions",15,null],[11,"scan_mut","","",20,null],[11,"build_for_platform","","",24,null],[11,"scan","","",25,null],[11,"scan","","",26,null],[11,"open_stream","","",27,null]],"paths":[[3,"ExpressionInfo"],[3,"CompileFlags"],[3,"Pattern"],[4,"Error"],[4,"Block"],[4,"Streaming"],[4,"Vectored"],[3,"PlatformInfo"],[3,"RawDatabase"],[3,"RawScratch"],[3,"RawStream"],[8,"Type"],[8,"Database"],[8,"SerializableDatabase"],[8,"SerializedDatabase"],[8,"DatabaseBuilder"],[8,"Expression"],[8,"Scratch"],[8,"ScratchAllocator"],[8,"Scannable"],[8,"BlockScanner"],[8,"VectoredScanner"],[8,"Stream"],[8,"StreamingScanner"],[6,"Patterns"],[6,"BlockDatabase"],[6,"VectoredDatabase"],[6,"StreamingDatabase"]]};
initSearch(searchIndex);
