// Emma van Proosdij 10663657

// make datamap
window.onload = function() {
  var map = new Datamap({
    element: document.getElementById('container1'),

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
                ': ' + data.population,
                '</strong></div>'].join('');
          }
          // display it if no data is available
          else{
            return ['<div class="hoverinfo"><strong>',
                 geo.properties.name,
                 ': no data ',
                 '</strong></div>'].join('');
          }
        }
     },

     // load data
     dataUrl: 'populationnew.json',
     dataType: 'json',
     data: {},
     fills: {
       100: '#41b6c4', 1000: '#253494', 10: '#ffffd9', 75: '#7fcdbb', 300: '#225ea8', 50: '#c7e9b4', 150: '#1d91c0', 3000: '#081d58', 25: '#edf8b1', 'defaultFill': 'grey'
     },
  });

  // make legend
  map.legend({
     legendTitle : "people per sq. km of land area",
     defaultFillName: "No data",
     labels: {
       10: "0-10",
       25: "10-25",
       50: "25-50",
       75: "50-75",
       100: "75-100",
       150: "100-150",
       300: "150-300",
       1000: "300-1000",
       3000: "> 1000",
     }
   });
}
