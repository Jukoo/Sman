#!/usr/bin/env node 

_stdin_process_stream  : {  read = require("readline")  }
_sys_process           : {  chproc= require("child_process") }  
//https://row.githubusercontent.com/ngorseckframework/samanemvc/master/config/database.php
const { log } = console
module
["exports"] = {
    // enable raw input   >  
    ["process::stream"]  :(arguments , _cb)  => {
        const  str_args = arguments || "..." ;  

        const stdin_stream = read
            ["createInterface"]({
                input   : process.stdin , 
                output  : process.stdout,
                prompt  : ">>"
            })

        stdin_stream["prompt"]() 
        
        stdin_stream.question(str_args , stdout_chunk => {  
            _cb(stdout_chunk)  
            stdin_stream.close() 
        }) 
    
    },    
    ["SubDirMapping"] :  () => {
        return  [ 
            conf_dir_location  = "config/database.php",
            ctlr_dir_location  = "controllers/TestController.class.php",
            ents_dir_location  = "entities/Test.php", 
            mods_dir_location  = "models/TestDB.php" 
        ]
             
    } , 
	// ! Download  file through  http request using curl  ... er 
	//!  @directlink  =>  remote url 
	//!  @output_stage =>   output  file  
	//!  @filesCollections  => list  of  files  
    ["filesDownloader"]  :  ( directlink  , fileTarget , output_stage= new Object(""))  => {  // !  output_stage  =~  template
        const{ exec } =  chproc  
        exec(`curl ${directlink}${fileTarget} -o  ${output_stage}`  , 
            (err , stdout , stderr) =>  {  
                if (err)  throw new FilesDownloadExcept("failed to download  files  from remote source")
                log("[done]")
            })
    }, 

    ["AllowedArgs"] :  {
        ["GlobalOption"]  :{
            ["--env"]     :"Set NODE_ENV before running the commands", 
            ["--no-ansi"] :"Disable colored output" 
        }, 
        ["AvailableCommande"] : {    
            ["cache"]     :"Disable colored output", 
            ["config"]    :"Set your Samane project configuration" ,
            ["generate"]  :"Use it to generate Samane Files and CRUD operations" 
        }, 
        ["Config"]        : {    
            ["db"]        :"Set your Samane project configuration", 
            ["default"]   :"Restore your config file by default",
            ["restore"]   :"Undo your last config file restoration", 
            ["show"]      :"Show content of your config file"
        } 
    }, 
    usage (process_argv)  { 
        const  {AllowedArgs , argSuggest , colors:{paint}}  = module.exports
        const  description  = []  ,allowed_args= [] ; 
        //   this  Section  parse the AllowedArgs  and extract t
        //   the  information inside  
        //   the keys and value  are stored  separaly for easy usage  
        Object.keys(AllowedArgs).forEach( args_helper =>  { 
            allowed_args.push(...Object.keys({...AllowedArgs[args_helper]}))
            description.push(...Object.values({...AllowedArgs[args_helper]}))
        })
        // when  no allowed argument was not define or user do some mistake by typing 
        // it gives you some  suggestion and remind the basic usage 
        if  ( !allowed_args.includes(process_argv))
        { 
            argSuggest(allowed_args , process_argv)
            log("Usage of  "  +  process.argv[0x01].split("/").pop() + "< argument > ")
            for ( const argument_list in allowed_args  )  
            {
                 log(allowed_args[argument_list] + "\t:\t"+ description[argument_list])    
            }
            process.exit(1) ; 
        }      
    }, 
    
    // make a suggestion  if user do some mistake
    // while typing   arguments  e 
    ["argSuggest"]  : (args_words , args) =>  {
        if   (!args) return 
        const  { colors : { paint ,  fs ,bc}  } = module.exports  
        let occurence = 0x000 ;
        for ( const  word of  args_words ) 
        { 
            if (args_words.includes(args))  break
            match:
            for ( const each_lettre in word ) 
            {
                if  (args[each_lettre]  == word[each_lettre])
                    occurence++
                else
                    occurence=0x000
                // the user   has to type at least 2 letters for the suggestion to take place
                if (occurence >=0x002) 
                { 
                    //paint(`->did you mean  : ${word} `  , fs.bold ,bc.b_red ) ; 
                    log(`->did you mean  : ${word} `) ; 
                    break
                }        
            }  
        }

    }, 
    
    ["colors"]  : { 
         ["DEPC"] : "\033[" ,           //! DEfault   Prefix  Color 
         ["DEFC"] : "\033[0m",          //! DEfault   Font    Color

         ["fs"]  : {                    //! fs =>  Font style 
             normal   :0, 
             bold     :1, 
             darken   :2,
             italic   :3,
             u_line   :4, 
             blink    :5,  
             reverse  :7,
             invisible:8, 
             barred   :9
         } ,  
        ["fc"] : {                      //!  fc =>  Font colors 
             f_black    :30 , 
             f_red      :31 ,
             f_green    :32 , 
             f_yellow   :33 ,
             f_blue     :34 , 
             f_magenta  :35 ,
             f_cyan     :36 ,
             f_white    :37 ,
             zero_def   :0 
        }, 
        ["bc"] : {                      //! bc  =>  background  colors
             b_black    :40 , 
             b_red      :41 ,
             b_green    :42 , 
             b_yellow   :43 ,
             b_blue     :44 , 
             b_magenta  :45 ,
             b_cyan     :46 ,
             b_white    :47 , 
             zero_def   :0
        } , 
        
        paint  : (mesg,_fs=0 , _fc=0  , _bc=0)  => {
             
             const  
             {colors : { DEPC , DEFC , fs , fc ,bc }} = module.exports, 
             arguments = [ _fs,_fc,_bc ] , 
             [fs_code ,   fc_code  ,  bc_code]=[fs,fc,bc].map(color_code => Object.values(color_code)), 
             [f_style ,   f_color  , b_color ]=arguments.map(single =>single.toString()) ; 
             
             font_style_check : 
             for(const c_font  of fs_code)     if (!fs_code.includes(_fs)) throw new PaintExecption(`Undefined  font ${__filename}`)             ;
             
             font_color :  
             for(const c_color_f  of fc_code)  if (!fc_code.includes(_fc)) throw new PaintExecption(`Undefined  font colors ${__filename}`)      ;
             
             back_color :       
             for ( const c_color_b of bc_code) if(!bc_code.includes(_bc))  throw new PaintExecption(`Undefined background  Color ${__filename}`) ;


             if (!_fc)log(DEPC+f_style+";"+b_color+"m %s " + DEFC , `${mesg}`) ;
             if (!_bc)log(DEPC+f_style+";"+f_color+"m %s " + DEFC , `${mesg}`) ;

             if  (_bc && _fc)
                log(DEPC+f_style+";"+f_color+";"+b_color+"m%s " + DEFC , `${mesg}`) ;  
        }
    }  , 

    ["stream"]  : {
         // generate  target  file  from  source  file  
         flux   : (  
             {createReadStream , createWriteStream ,  stat },           //~  file system  object   
             src ,                                                      //~  source file 
             dest                                                       //~  destination  
          ) => {
              const [r_stream , w_stream  ]  = [
                  createReadStream(src) , 
                  createWriteStream(dest)
              ] ;  
              r_stream["pipe"](w_stream)  ; 
              w_stream.on("finish" ,   v => log("[done]")) ;  
         }
    }
}

ExceptionConstructors :  {
    ["@stderr_tty_format_color"]
    function  PaintExecption (mesg) {
        this.mesg = mesg  ; 
        this.name = PaintExecption["name"] ; 
    }

   ["@stderr_http_files_download"] 
   function  FilesDownloadExcept (mesg)  {
		this.mesg = mesg 	
		this.name = FilesDownloadExcept["name"]  
	}
}

