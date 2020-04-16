#!/usr/bin/node 

_KERNEL_MOD_ : { core   = require("./kernel")           }  ; 
_lib         : { lib    =  core["@lib"]                 }  ;  
_node_native : { node_n =  core["@node_native_modules"] }  ;
_remote_repo : { samane =  core["@samane"]   			}  ;
_root_utils  : { tmproot=  `${__dirname}/templates/`    }  ;
_dir_ref     : {templates="templates/"                  }  ; 

const 
{ _global}      = lib,
{ repository  } = samane,   
{log}           =console,
{f_stream, Sys , ch_proc} = node_n,
{
colors:{fs ,fc,bc,paint}, 
file_generator , stream:{flux} , 
usage ,argSuggest , 
filesDownloader 
} =_global , 

subDir = [
     conf_dir_location  
    ,ctlr_dir_location  
    ,ents_dir_location   
    ,mods_dir_location  
]= _global["SubDirMapping"]()


process.argv[0x00] = {
     ["#utils"]  : {
         //~   seperate   the folders  and files   form current 
         //~   path  passed on arguments   
          DF_spread  :  abspath_ => [ _dir_  , _file_ ]  = abspath_.split("/") , 
          D_access   :  path_ =>  {
              return  new Promise ( ( res , rej ) => {
                  f_stream.lstat(path_ , (err,  stat_o ) =>{
                      if  ( err  || stat_o == undefined) 
                      {
                        throw  err.errno ; 
                        process.exit(2)  ; 
                      }
                      res(stat_o.isDirectory()) 
                  })
              })
          } ,  
         F_access  : file  => {  
             return  new Promise  (  ( res  , rej) =>  {
                f_stream.access (file  , f_stream.constants["F_OK"] , err => {
                    if   (err)  
                    { 
                        log(`${err.code}  no such file  access   -> [ ${file} ]   `)    
                        rej(err.errno)  
                    }else res(true)    
                })
             }) 
         }
     },  
     ["#check_template_dir"]  () {
         //~ import  utile  namespace  
         const  { DF_spread , D_access ,  F_access} = process.argv[0x000]["#utils"] ,
             temps  = [...DF_spread(tmproot)][DF_spread(tmproot).indexOf("templates")] + "/"
         //~  .sman_session   if  not  defined   crate  a new one 
         //~  that indicate the  projet is well initialized 
         f_stream.access(".sman_session"  ,  f_stream.constants["F_OK"] , err => {
             if ( err ) 
             {
                 // reaching  the  main templates root directory   
                 // for inspect  if the  subfolder  are defined and files also
                 // however  if one of their files are missing  
                 // it  automaticly download file  form remote source 
                 // by default  it using native curl  based in the OS 
                 // generaly unix  OS have  it already   but window  should download curl 
                 D_access(tmproot)
                 .then( OK => {
                     let t_file  = 0x000 
                     for  ( const dir_file of  subDir)
                     {
                         F_access(tmproot + dir_file)
                         .then(  bool_ok /*true*/  =>  { 
                             t_file++ 
                             if  ( t_file== subDir.length )f_stream.writeFile(".sman_session" , `~54M${t_file}n3`, err => log("cached ...")) 
                         })
                         .catch(err_status => {  
                             log(`Downloading   [ ${dir_file} ]`)
                             filesDownloader (repository  ,  dir_file  , temps+dir_file)
                         })
                     }
                 })
             }else paint(`Everything is ok`,fs.blink, fc.f_green) 
         }) 
     },

     //! testing IO STREAM  
     ["#stream_process"]()  {
         const    file_src =  tmproot+conf_dir_location ; 
         log(file_src)
         flux(f_stream ,file_src ,  "sample") ;  
     } ,
     // testing  download file 
	 test  () {
	 	   log("Dowloading file ... ") 
		   const  files = "/config/database.php" 
	 	   filesDownloader(repository ,  files ,  "db.php" )  ; 	
	 }
}

//process.argv[0x00].test()  
// help argument test  ...  
//if ( process.argv[2] ) usage(process.argv[2])
//process.argv[0x00]["#utils"]["D_access"](tmproot)
process.argv[0x00]["#check_template_dir"]()
//process.argv[0x00]["#stream_process"]()



