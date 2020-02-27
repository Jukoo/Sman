#include <iostream>
#include <stdlib.h> 
#include <fstream>
#include <string> 
#include <vector> 
#include <map>  
#include <errno.h> 

#include "sm.h"


static  void  is_file_exist ( std::string  const &file_stream ) 
{
      std::ifstream  _if(file_stream) ; 
      if (_if)
      {
         _if.seekg(std::ios::beg , std::ios::end) ;
         std::cout <<  _if.tellg() << std::endl ;  
         if (_if.tellg() <= 0x00 ) 
         {
             (void)fprintf(stderr, "UNDEFINED FILE:  %s missing or empy \n", file_stream.c_str())  ;
             exit(EXIT_FAILURE) ; 
         } 
      }
}

void  templates_base_file  (void)  {
 
    std::vector<std::string>  under_templates_file={
        T_CONF_FILE, 
        T_CTRL_FILE,
        T_ENTITIES_FILE, 
        T_MODELS_FILE
    }  ; 

   for(auto & each_file  : under_templates_file  ) 
   {
        std::string  relative_path = TEMPLATE_PATH  + each_file  ; 
        is_file_exist(relative_path)  ;
   }
    
}