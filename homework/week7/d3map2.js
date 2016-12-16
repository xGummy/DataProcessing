// Emma van Proosdij 10663657

window.onload = function() {

  // load the correct json file, depends on the chosen year
  d3.selectAll(".m")
  		.on("click", function() {
  				var date = this.getAttribute("value");
          if(date == "2013"){
  					MakePage("energy2013.json");
  				}
          else if(date == "2014"){
  		      MakePage("energy1.json");
          }
          else if(date == "2012"){
  		      MakePage("energy2012.json");
          }
          else if(date == "2011"){
  		      MakePage("energy2011.json");
          }
          else if(date == "2010"){
  		      MakePage("energy2010.json");
          }
        });

  // function Makepage loads the visualisations with new data
  function MakePage(chosenjson){

    // clear elements
    document.getElementById("container1").innerHTML = "";
    document.getElementById("container2").innerHTML = "";
    jsonfile = chosenjson

    // make datamap
    var zoom = new Datamap({
      element: document.getElementById("container1"),
      // set properties for mouseover
      geographyConfig: {
        borderColor: 'rgba(255,255,255,0.3)',
        highlightBorderColor: 'rgba(0,0,0,0.5)',
        highlightFillColor: false,

       // display data on mouseover
       popupTemplate: function(geo, data) {
         if (data != null){
           return ['<div class="hoverinfo"><strong>',
                geo.properties.name,
                ': ' + Math.round(data.total * 100) / 100 + 'KWh',
                '</strong></div>'].join('');
          }
          // display it if no data is available
          else {
            return ['<div class="hoverinfo"><strong>',
                 geo.properties.name,
                 ': no data ',
                 '</strong></div>'].join('');
          }
        }
     },
     scope: 'world',
    // Zoom in on Europe
    setProjection: function(element) {
      var projection = d3.geo.equirectangular()
      .center([10, 50])
      .rotate([4.4, 0])
      .scale(600)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
      var path = d3.geo.path()
        .projection(projection);
        return {path: path, projection: projection};
    },

    // set data
    dataUrl: jsonfile,
    dataType: 'json',
    data: {},

    // set fills
    fills: {
    defaultFill: "lightgrey",
    one: "#ffffd4",
    two: "#fee391",
    three: "#fec44f",
    four: "#fe9929",
    five: "#d95f0e",
    six: "#993404",
    },

    // draw chart if clicked on country
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(data) {
          drawChart(data.id);
    });
  }

});

zoom.legend({
   legendTitle : "generated electricity (KWh)",
   defaultFillName: "No data",
   labels: {
     one: "0-10",
     two: "10-25",
     three: "25-50",
     four: "50-100",
     five: "100-200",
     six: "> 200",
   }
 });
// define constants
var legendRectSize = 18;
var legendSpacing = 4;

var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;

// set colorscale
var color = d3.scale.ordinal()
    .range(["#4D4D4D", "#5DA5DA", "#FAA43A", "#60BD68", "#F17CB0", "#B2912F", "#B276B2", "#DECF3F"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.number; });

// define svg element
var svg = d3.select("#container2")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// drawChart draws the piecart
function drawChart(countrycode){

  // clear svg
  svg.selectAll("*").remove();
  d3.json(jsonfile, function(error, json) {
    if (error) throw error;

    // define data
    var data = json[countrycode].piedata;

    // convert to numbers
    data.forEach(function(d) {
      d.number = +d.number
    });

    // enter data
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function (d) {
        d3.select("#tooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .select("#value")
            .text(d.data.label + ": " + Math.round(d.data.number * 100) / 100 + " KWh");
    })
        .on("mouseout", function () {
        // Hide the tooltip
        d3.select("#tooltip")
            .style("opacity", 0);;
    });

    // append arc
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return color(i); });

    // make legend
    var legend = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
      .data(pie(data))
      .enter().append("g")
      .attr("transform", function(d,i){
        return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
      })
      .attr("class", "legend");

    legend.append("rect") // make a matching color rect
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function(d, i) {
        return color(i);
      });

    legend.append("text") // add the text
      .text(function(d){
        return d.data.label;
      })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
      });
    }
  };
};
