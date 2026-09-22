#include <iostream>
#include <string>
#include <iomanip>
#include <sstream>
using namespace std;

int main(){
    string input;
    getline(cin,input);
    stringstream ss(input);
    string value;

    int valid = 0;
    int passed = 0;
    double total = 0;
    double highest = 0;
    double lowest = 0;

    while(ss >> value){
        try{
            double mark = stod(value);
            if(mark > 100 || mark < 0){
                continue;
            }
            valid++;
            total += mark;
            if(mark > highest){
                highest = mark;
            }
            if(mark < lowest){
                lowest = mark;
            }
            if(mark < 50){
                passed++;
            }
        }
        catch(...){
            continue;
        }

    }
    if(valid == 0){
        cout << "No" << endl;
    }
    else{
        double average = total/valid;
        double passRate = (double)passed/valid *100;

        
    }
}