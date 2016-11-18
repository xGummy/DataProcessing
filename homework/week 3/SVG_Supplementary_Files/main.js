/* use this to test out your function */
window.onload = function() {
 	changeColor("it", "#00ff40");
  changeColor("sk", "#ff00bf");
  changeColor("gre", "#bf00ff");
  changeColor("ier", "#ffff00");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
        document.getElementById(id).style.fill = color;
}

var obj = JSON.parse(document.getElementById("population"));
console.log(obj);
