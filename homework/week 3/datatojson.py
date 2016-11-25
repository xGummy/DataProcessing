#Emma van Proosdij
#10663657
import json
import csv

list1 = []
list2 = []

with open('population.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        list1.append({"country": row[0], "population": row[59]})
        list2.append(row[59])
people = {"points": list1}

with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 3\population.json', 'w') as outfile:
    json.dump(people, outfile, sort_keys=True)
    


