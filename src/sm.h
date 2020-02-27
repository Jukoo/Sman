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
