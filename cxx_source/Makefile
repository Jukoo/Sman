#!usr/bin/make 


cxx  = g++  -std=c++17  
lcurl  = -lcurl  #argument  used for libcurl  
cxxflags  = -Wall -Wextra  -pedantic  
#exec_with_curl_fetcher = sman_cf  #  not yet implemented  
exec  = ../sman     
src  = $(wildcard *.cc) 
header_inc= $(wildcard *.h)
obj  = $(src:.cc=.o)


all : $(exec)
	
sman.o  :$(header_inc)  

$(exec) : $(obj) 
	$(cxx)   -o $@ $^  $(cxxflags)

#[  not yet implemented   because it use   curl lib  
#$(exec_with_curl_fetcher) : $(obj) 
#	$(cxx)   -o $@ $^  $(cxxflags)  $(lcurl)

%.o  :  %.cc  
	$(cxx) -o  $@  -c $<  $(cxxflags)

.PHONY : clean  mproper

clean  : 
	rm -rf *.o

mproper  : clean 
	rm  -rf $(exec) #$(exec_with_curl_fetcher)


