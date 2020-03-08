#include <iostream>
#include <stdlib.h> 
#include <fstream>
#include <string>
#include <cstring> 
#include <vector> 
#include <map>  
#include <errno.h> 

#include "sm.h"

using namespace std::literals::string_literals;  

std::__cxx11::string stylish  ( int fs   ,  int fc , int bc  ) {
	 std::string  font_style  =  std::to_string(fs) ; 
     std::string   ss   {""s } ;    
 	 if  (fc  != 0x00) 
         ss = CPRE +  font_style + ";" +std::to_string(fc)+ "m";
 	 if (  bc != 0x00)
         ss=  CPRE +  font_style + ";" + std::to_string(bc) + "m" ;  
     if  (bc != 0x000  &&  fc != 0x000)  
         ss= CPRE +  font_style + ";" + std::to_string(fc) + ";" + std::to_string(bc) + "m" ;   

     return  ss ;
}



//~  
auto is_file_exist ( std::string  const &file_stream ) -> void   
{
    //~ read  file stream   
    std::ifstream  _if(file_stream) ; 
    if (_if)
    {
        //~check if the file  is not an empty file  
        _if.seekg(std::ios::beg , std::ios::end) ;
        std::cout <<  _if.tellg() << std::endl ;  
        
        if (_if.tellg() <= 0x00 ) 
        {
            std::fprintf(stderr, "UNDEFINED FILE:  %s missing or empy %c", file_stream.c_str() ,  0x00a)  ;
            exit(EXIT_FAILURE) ; 
        } 
    }
}


auto  create_stream ( std::string const & src ,   std::string const & dest ) -> void   {
    errno =  0 ; 
    //~ read  source  file 
    std::ifstream src_stream (src)  ; 
    //~ and write  the source  file  to  generate  
    //~+ the corresponded file  
    std::ofstream dest_stream ( dest.c_str())  ;  
    auto  virtual_cursor {""s} ;  
    if  ( src_stream)  
        while (std::getline(src_stream  , virtual_cursor)) 
                //~  make pipe  to writable stream 
                dest_stream <<  virtual_cursor << std::endl ;   
    else  {
        std::fprintf (stderr ,  "FAILED : %s \n", strerror(errno)) ;  
        exit(errno) ;  
    }
}



auto  arg_manager  (std::vector<std::string>&args_collects  , bool show=false) -> void {
     //~arguments  
     
     //! set global option Arguments   
     std::map<std::string  , std::string> g_opt{
             {"--env    " , "Set NODE_ENV before running the commands "} , 
             {"--no-ansi" , "Disable colored output"}  
     } ; 
     //! set  Available commande  
     std::map <std::string  , std::string> av_cmd  { // ~ available commande
             { "cache  " ,   "Disable colored output"},
             {"config  " ,   "Set your Samane project configuration"} , 
             {"generate" ,   "Use it to generate Samane Files and CRUD operations" } 
     } ; 
    //! Config generator commande  
    std::map  <std::string  , std::string > config  {
            { "db    ",   "Set your Samane project configuration"},
            {"default",   " Restore your config file by default"},
            {"restore",   " Undo your last config file restoration"},
            {"show   " ,  " Show content of your config file"} 
    };  

    auto helper =[&](std::map<std::string , std::string> &args , std::string  label) -> void {
    
        std::map<std::string ,std::string>::iterator  i   ;          
        
        std::cout <<  stylish(NORMAL , F_CYAN)  ; 
        std::fprintf(stdout , "%s %s %c" ,  label.c_str() , DEFC ,  0x00a) ;  

        for( i = args.begin()  ;  i  != args.end() ; i++ )
        {
            std::cout << stylish(BOLD , F_BLUE) ; 
            std::fprintf(stdout , "%s : %s \t\t %s %c" , i->first.c_str(), DEFC  , i->second.c_str() ,  0x00a) ;   
            args_collects.push_back(i->first) ;  
        } 
    } ;  
 
    //~ display   helper    
    if  ( show )  
    {
        helper(g_opt ,  "Global Option")  ; 
        helper(av_cmd , "Available  Commande") ; 
        helper(config , "Config")  ;  
    }
    
}

auto arg_setup(std::vector<std::string>& args_list , int const & argc , char **argv) -> void  {
     if  ( argc  == 0x0002 ) 
     {
         std::string  argparser = argv[1]   ; 
          
         if (argparser == "-h" || argparser =="--help")  
             arg_manager(args_list,  true) ; 
     }
}

