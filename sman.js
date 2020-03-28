#!/usr/bin/node 

_KERNEL_MOD_ : { core   = require("./kernel")           }  ; 
_lib         : { lib    =  core["@lib"]                 }  ;  
_node_native : { node_n =  core["@node_native_modules"] }  ;
_root_utils  : { tmproot=  `${__dirname}/templates/`    }  ; 

const 
{ _global}      = lib,
{log}           =console,
{f_stream, Sys} = node_n,
{colors:{fs ,fc,bc,paint}, 
stream:{flux} , usage ,argSuggest} =_global , 
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
          DF_spread  :  path_ => [ _dir_  , _file_ ]  = path_.split("/") , 
          D_access   : ( path_  ,  cb_) =>  {
                f_stream.lstat(path_ , (err,  stat_o ) =>{
                  if  ( err  || stat_o == undefined) 
                  {
                     throw  err.errno ; 
                     process.exit(2)  ; 
                  }
                  cb_(stat_o.isDirectory()) 
              })
          }
     },  
     ["#check_template_dir"]  () {
         //~ import  utile  namespace  
          const  { DF_spread  , D_access} = process.argv[0x000]["#utils"]; 
         //~  .sman_session   if  not  defined   crate  a new one 
         //~  that indicate the  projet is well initialized 
         f_stream.access(".sman_session"  ,  f_stream.constants["F_OK"] , err => {
             if ( err ) 
             {
                 //~ reaching  the  main templates root directory   
                 //~ for inspect  if the  subfolder  are defined and files also  
                 D_access(tmproot  ,  OK =>  {
                     let  t_files = 0  ; 
                     if (OK)
                     ["@init_sub_stream"]
                        
                         //  check  sub directory ...    
                         for (const _sb of  subDir)
                         {  
                             const [dir,file]  = DF_spread(_sb)
                             log (`checking subdir  ${dir} -> ${file}`)
                             D_access(`${tmproot}${dir}` ,  OK => {
                                 if (OK) 
                                     f_stream.access(`${tmproot}${dir}/${file}` , f_stream.constants.F_OK  ,err =>{
                                         if  ( err ) 
                                         {
                                             log(`missing content file ->${file}`) 
                                             process.exit(2)
                                         }else {
                                             t_files++ ; 
                                             f_stream.writeFile(".sman_session" , `~54M${t_files}n3`, err => log("cached ..."))
                                         } 
                                     })
                                 //!->i
                                
                             })
                         }
                     ["@end_sub_stream"]  
                 })

             }//else// paint(`Everything is ok`,fs.blink, fc.f_green) 
            
              
         }) 
     }, 
     ["#stream_process"]()  {
         const    file_src =  tmproot+conf_dir_location ; 
         log(file_src)
         flux(f_stream ,file_src ,  "sample") ;  
     }
}

usage(process.argv[2])
process.argv[0x00]["#check_template_dir"]()
process.argv[0x00]["#stream_process"]()



