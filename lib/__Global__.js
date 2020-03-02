#!/usr/bin/env node 

_stdin_process_stream  : {  read = require("readline")  }
const { log } = console
module
["exports"] = {
    
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
    
    } , 
    
    ["SubDirMapping"] :  () => {
        return  [ 
            conf_dir_location  = "config/database.php",
            ctlr_dir_location  = "controllers/TestController.class.php",
            ents_dir_location  = "entities/Test.php", 
            mods_dir_location  = "models/TestDB.php" 
        ]
             
    },  
    
    ["argSuggest"]  : (args_words , args) =>  {
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
                        
                if (occurence >=0x001) 
                { 
                    console.log("->did you mean  :"  , word)
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
             for(const c_font  of fs_code)  if (!fs_code.includes(_fs))    throw new PaintExecption("Undefined  font")             ;
             
             font_color :  
             for(const c_color_f  of fc_code)  if (!fc_code.includes(_fc)) throw new PaintExecption("Undefined  font colors")      ;
             
             back_color :       
             for ( const c_color_b of bc_code) if(!bc_code.includes(_bc))  throw new PaintExecption("Undefined background  Color") ;


             if (!_fc)log(DEPC+f_style+";"+b_color+"m %s " + DEFC , `${mesg}`) ;
             if (!_bc)log(DEPC+f_style+";"+f_color+"m %s " + DEFC , `${mesg}`) ;

             if  (_bc && _fc)
                log(DEPC+f_style+";"+f_color+";"+b_color+"m%s " + DEFC , `${mesg}`) ;  
        }
    }  
    
}

ExceptionConstructors :  {
    ["@stdout_font_color_style"]
    function  PaintExecption (mesg) {
        this.mesg = mesg  ; 
        this.name = PaintExecption["name"] ; 
    }
}

