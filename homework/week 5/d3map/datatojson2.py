#Emma van Proosdij
#10663657
import json
import csv



colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]
values = [10, 25, 50, 75, 100, 150, 300, 1000, 3000]

data = {}
fills = {}

for i in range(len(colors)):
    fills[values[i]] = colors[i]
    
fills["defaultFill"] = "grey"

with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 3\population.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[59] != "":
            for i in values:
                if float(row[59]) < i:
                    data[row[1]] = {"fillKey": i, "population": round(float(row[59]),2)}
                    break

                                        
     

print json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '))
print data["ABW"]
with open('C:\Users\Emmaa\Documents\GitHub\DataProcessing\homework\week 5\populationnew.json', 'w') as outfile:
    json.dump(data, outfile, sort_keys=True, indent=4, separators=(',', ': '))
    
    

