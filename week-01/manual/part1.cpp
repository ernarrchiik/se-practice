#include <iostream>
#include <sstream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    string input;
    getline(cin,input);
    stringstream ss(input);
    string value;

    int valid = 0;
    int passed = 0;
    double total = 0;
    double highest = 0;
    double lowest = 100;
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
            if(mark >= 50){
                passed++;
            }
        }
        catch(...){
            continue;
        }
    }
    if(valid == 0){
        cout << "message, no crush" << endl;
    }
    else{
        double average = total/valid;
        double passRate = (double)passed/valid*100;

        cout << "Valid: " << valid << endl;
        cout << fixed << setprecision(2);
        cout << "Average: " << average << endl;
        cout << "Highest: " << highest << endl;
        cout << "Lowest: " << lowest << endl;
        cout << fixed << setprecision(1);
        cout << "Pass rate: " << passRate << "%"<<endl;


    }

    return 0;
}