//Emma van Proosdij 10663657

window.onload = function() {

  // load data
  d3.json("maxmingemtemp.json", function(error, json) {
    data2014 = json.forteen;
    data2015 = json.fifteen;
    console.log(data2014);
    console.log(data2015);
  });
};
