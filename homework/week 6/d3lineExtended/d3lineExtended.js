window.onload = function() {
  // set margin
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // parce date
  var parseDate = d3.time.format("%Y%m%d").parse;

  // define axis and scale
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

  // define lines
  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

  var line2 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.max); });

  var line3 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.min); });

  // Define the div for the tooltip
  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // Define svg elements
  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // execute function drawline when button clicked
  d3.selectAll(".m")
  		.on("click", function() {
  				var date = this.getAttribute("value");
          if(date == "2014"){
  					drawLine("2014");
  				}
          else if(date == "2015"){
  		      drawLine("2015");
          }
        });

  // execute function drawline to start
  drawLine("2014")


  function drawLine(year) {
    // clear frame when drawline is called
    svg.selectAll("*").remove();

    // load data
    d3.json('maxmingemtemp.json', function (data) {
      if (year == "2014"){
        var dateswitch = data.forteen;
      }
      if (year == "2015"){
        var dateswitch = data.fifteen;
      }

      dateswitch.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.avarage;
      });

      // set domains
      x.domain(d3.extent(dateswitch, function(d) { return d.date; }));
      y.domain([d3.min(dateswitch, function(d) { return d.min; }), d3.max(dateswitch, function(d) { return d.max; })]);


      // Add paths
      svg.append("path")
          .attr("class", "line")
          .attr("d", line(dateswitch));

      svg.append("path")
          .attr("class", "line2")
          .attr("d", line2(dateswitch));

      svg.append("path")
          .attr("class", "line3")
          .attr("d", line3(dateswitch));

      // Add the scatterplot
      svg.selectAll("dot")
          .data(dateswitch)
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

      // Add the scatterplot
      svg.selectAll("dot")
          .data(dateswitch)
          .enter().append("circle")
          .attr("r", 2)
          .attr("cx", function(d) { return x(d.date); })
          .attr("cy", function(d) { return y(d.min); })
          .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div	.html("<strong>minimum temperature:</strong>"  + d.min)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });

          // Add the scatterplot
          svg.selectAll("dot")
              .data(dateswitch)
              .enter().append("circle")
              .attr("r", 2)
              .attr("cx", function(d) { return x(d.date); })
              .attr("cy", function(d) { return y(d.max); })
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>maximum temperature:</strong>"  + d.max)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });




      // add x axis
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // add y axis
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

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
};
