#!usr/bin/make 


cxx  = g++ 
lcurl  = -lcurl  #argument  used for libcurl  
cxxflags  = -Wall -Wextra  
exec_with_curl_fetcher = sman_cf
exec  = ../sman   # compile in default   
src  = $(wildcard *.cc) 
obj  = $(src:.cc=.o)


all : $(exec)
	
sman.o  : sm.h


$(exec) : $(obj) 
	$(cxx)   -o $@ $^  $(cxxflags)




$(exec_with_curl_fetcher) : $(obj) 
	$(cxx)   -o $@ $^  $(cxxflags)  $(lcurl)


	

%.o  :  %.cc  
	$(cxx) -o  $@  -c $<  $(cxxflags)



.PHONY : clean  mproper

clean  : 
	rm *.o

mproper  : clean 
	rm  $(exec) $(exec_with_curl_fetcher)


