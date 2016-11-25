// Emma van Proosdij 10663657

// define dimension and placement of chart
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Tip displays the value if you hover over a bar
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>hours per day:</strong> <span style='color:red'>" + d.hours + "</span>";
  })

// scale and make axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// call window.onload function so you can append chart to body element
window.onload = function() {

  // define chart
  var chart = d3.select("body")
    .append("svg")
      .attr("class","chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.call(tip);

  // load data
  d3.json("sunshine.json", function(error, json) {
    data = json.points

    //set x and y domain
    x.domain(data.map(function(d) { return d.month; }));
    y.domain([0, d3.max(data, function(d) { return d.hours; })]);

    // append axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // append bars
    chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.month); })
        .attr("y", function(d) { return y(d.hours); })
        .attr("height", function(d) { return height - y(d.hours); })
        .attr("width", x.rangeBand())
        .attr("fill","orange")
        .on("mouseover", function(d) {
          tip.show(d);
          d3.select(this).attr("r", 10).style("fill", "red");
        })
        .on("mouseout", function(d) {
          tip.hide(d);
          d3.select(this).attr("r", 5.5).style("fill", "orange");
        })

  });
}
