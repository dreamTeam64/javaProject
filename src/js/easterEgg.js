function draw(canvas) {
   var ctx = canvas.getContext("2d");

   ctx.fillStyle = "red";

  ctx.beginPath();
  ctx.moveTo(30, 30);
  ctx.lineTo(150, 150);
  ctx.bezierCurveTo(60, 70, 60, 70, 70, 150);
  ctx.lineTo(30, 30);
  ctx.fill();
}
//
function displayFun() {
  var titre = document.getElementById("titre");
  var canvas = document.getElementById("canvas");
  console.log("titre: ", titre);
  titre.addEventListener("mouseover",function(event){
      console.log("i'm on it bro !");
      if (event.shiftKey && event.altKey) {
        // alert("grooooooooooooooooow");
        canvas.style.display = "block";
        draw(canvas);
      }
  });
  titre.addEventListener("mouseout",function(){
    canvas.style.display = "none";

  });

  var img = document.createElement('img');
  
}

window.addEventListener("load",function(){
  displayFun();
});
