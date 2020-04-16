#!/usr/bin/make 

export cc  = g++ -std=c++17 
export cxxflags =  -Wall -Wexta  -pedantic  
source  = cxx_source/
exec    = sman 
 
all :  $(exec)

$(exec) :
	@(cd $(source) && $(MAKE)) 

.PHONY : clean  mproper  
	
clean:  
	@(cd $(source)  && $(MAKE) $@)

mproper : clean 
	@(cd $(source)  && $(MAKE) $@)
