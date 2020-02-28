#if !defined(SAMANE_MVC)
#define  SAMANE_MVC

#define  BRANCH           "master" 
#define  REPOS_OWNER      "ngorseckframework/samanemvc/"
#define  SAMANE_ROOT_URL  "https://raw.githubusercontent.com/"

#define  TEMPLATE_PATH    "templates/"

#define  T_CONF_FILE      "config/database.php"
#define  T_CTRL_FILE      "controllers/TestController.class.php"
#define  T_ENTITIES_FILE  "entities/Test.php"
#define  T_MODELS_FILE    "models/TestDB.php"

//! colors 
#define   CPRE			 "\033["  			 //!  prefixed colors  
#define   DEFC     		 "\033[0m" 			 //!  default  end color  

//! font style 
#define  NORMAL    0x0
#define  BOLD      0x1
#define  DARKEN    0x2 
#define  ITALIC    0x3 
#define  UNDERLINE 0x4 
#define  BLINK     0x5 
#define  REVERSE   0x7 
#define  INVISIBLE 0x8
#define  BARRED    0x9  

//! font colors  
#define  F_BLACK   0x1e
#define  F_RED     0x1f
#define  F_GREEN   0x20
#define  F_YELLOW  0x21
#define  F_BLUE    0x22
#define  F_MAGENTA 0x23
#define  F_CYAN    0x24
#define  F_WHITE   0x25


//! background  colors  
#define  B_BLACK   0x28
#define  B_RED     0x29
#define  B_GREEN   0x2a
#define  B_YELLOW  0x2b
#define  B_BLUE    0x2c
#define  B_MAGENTA 0x2d
#define  B_CYAN    0x2e
#define  B_WHITE   0x2f 




std::string stylish (int ,int fc=0, int bc=0) ;

/*!
 * check if  the util file existe in the project directories  
 * however it  quick  when  on folder is missing or empty
 */
static  void  is_file_exist(std::basic_string<char> const & ) ; 


/*!
 * catch  the inside the template folder 
 */

void templates_base_file(void) ; 

#endif 
