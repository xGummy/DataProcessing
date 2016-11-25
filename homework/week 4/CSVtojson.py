#Emma van Proosdij
#10663657
import json
import csv


sundict = []
total = 0
month = 1
days = 0
monthDict= {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}


with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 4\sunshine.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        # add the amount of sunhours per day to a total per month
        #keep track of number of days
        if (month == int(row[1][4:6])):
            total += int(row[2])
            days += 1
        #add month and total hours of sunshine to dictionary
        #devide by number of days to get an average
        #devide by ten to get number of hours (instead of 0,1 hours)
        else:
            sundict.append({"month":monthDict[month], "hours": (total/days)/10.0})
            total = 0
            days = 0
            month +=1

sundict.append({"month":monthDict[month], "hours": (total/days)/10.0})
 

jsondict = {"points": sundict}

# write to json file    
with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 4\sunshine.json', 'w') as outfile:
    json.dump(jsondict, outfile, sort_keys=True)
    


