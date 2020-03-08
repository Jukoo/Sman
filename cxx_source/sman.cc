#include  <iostream> 
#include  <stdlib.h> 
#include  <fstream>
#include  <vector>
#include  <string> 
#include  <map>

#include  "sm.h"
using namespace  std::literals::string_literals ;  


int  main (int argc  , char **argv ) {
     
     std::vector<std::string> arg_collection ;
     arg_setup(arg_collection , argc , argv) ; 
 
    //~check the main template directory is  present in  projet 
    //~ collection   of all the file  needed   
    std::vector<std::string> sub_dir  =  {
        T_CONF_FILE, 
        T_CTRL_FILE,
        T_ENTITIES_FILE, 
        T_MODELS_FILE
    };


    int total_files =  sub_dir.size()  ; 
    int inspect_file  { 0x00 } ;   
    std::cout  <<  total_files << std::endl  ; 
    
    for  (auto const  &file : sub_dir) 
    {
        std::string  relative_path  =  TEMPLATE_PATH + file  ; 
        is_file_exist(relative_path) ; 
        inspect_file++ ; 
    }
    
    //~ create cache  if all files are set   
    //~  that hiden  session file mean   
    //~  everything is correctly  done  
    std::string    cache  { H_CACHE } ; 
    std::ifstream  session_cache(cache) ;  
    //~ it run  once  if all verification  are  OK   
    if  (  total_files  == inspect_file  &&  !session_cache)  
    {
        std::cout  << stylish(NORMAL , F_GREEN) ; 
        std::fprintf(stdout , "[ done ] Everything is Ok %s %c" , DEFC ,  0x00a ); 
        //~ creating  .hiden cahed file  
        std::ofstream create_session_cache(cache.c_str()) ; 
        if (create_session_cache) 
            create_session_cache  << ".init :" << __DATE__  << __TIME__ << std::endl;  
        else  {  
            std::fprintf(stderr , "FAILED ! to  create cache session %s \n", cache.c_str()) ; 
            exit(EXIT_FAILURE) ;   
        }  
    }
    
    if  ( total_files  !=  inspect_file)
    {
        std::fprintf(stderr , "some file are missing ...\n") ;
        exit(EXIT_FAILURE) ;   
    }
        
    


    return EXIT_SUCCESS ; 
}
