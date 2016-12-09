// Emma van Proosdij 10663657

window.onload = function() {

  // set margin
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set date
  var parseDate = d3.time.format("%Y%m%d").parse;

  // define and scale axis
  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  // define line
  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.avarage); });

  // Define the div for the tooltip
  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // define svg
  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // load data
  d3.json('maxmingemtemp.json', function (data) {
    data.forteen.forEach(function(d) {
      d.date = parseDate(d.date);
      d.avarage = +d.avarage;
    });

  // set domain
  x.domain(d3.extent(data.forteen, function(d) { return d.date; }));
  y.domain([d3.min(data.forteen, function(d) { return d.avarage; }), d3.max(data.forteen, function(d) { return d.avarage; })]);


  // Add line.
  svg.append("path")
      .attr("class", "line")
      .attr("d", line(data.forteen));

  // Add the plot
      svg.selectAll("dot")
          .data(data.forteen)
      .enter().append("circle")
          .attr("r", 2)
          .attr("cx", function(d) { return x(d.date); })
          .attr("cy", function(d) { return y(d.avarage); })
          .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div	.html("<strong>avarage temperature:</strong>"  + d.avarage)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });



  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  // add titles to axes
  svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (margin.left/2) +","+ 30 +")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("temperature (℃)")
      .style("font-weight","bold");

  svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2) +","+(height-(margin.left/3))+")")  // centre below axis
      .text("Date")
      .style("font-weight","bold");

  });
};
