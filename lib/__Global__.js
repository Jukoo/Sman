#!/usr/bin/env node 

_stdin_process_stream  : {  read = require("readline")  }

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
            _cb(  stdout_chunk )  
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

    }
    
}
