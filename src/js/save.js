function save() {
  if (window.location.hash == "#home") {
    var button = document.getElementById("saveRssLink");
    var rssLink = document.getElementById("rss_link");
    var arraySave;
    button.addEventListener('click',function (e) {
      if (e.handled !== true) {
        if(!localStorage.getItem("link")){
          localStorage.setItem("link",JSON.stringify([]));
        }else{
          arraySave = JSON.parse(localStorage.getItem("link"));
          if ((arraySave === null) ||(arraySave === undefined)) {
            arraySave = [];
          }
          if (typeof(Storage) !== "undefined") {
            arraySave.push(rssLink.value);
            localStorage.setItem("link",JSON.stringify(arraySave));
          } else {
            window.alert("no support of storage on your browser");
          }
        }

      }
      e.handled = true;
      e.preventDefault();
    },false);
  }
}

function deleteSave(){
  if (window.location.hash == "#home") {
    window.addEventListener("click",function(e){
      var button = document.getElementById("del");
      var link = button.previousSibling.href;
      console.log("link: ", link);
      console.log("button: ", e.target);


      button.addEventListener("click",function(e){
        var i =0;
        var arraySave = JSON.parse(localStorage.getItem("link"));
        console.log("i: ",i);
        console.log("arraySave.length: ", arraySave.length);
        console.log("arraySave[",i,"]",arraySave[i]);
        console.log("element recherché: ",link);
        if (e.handled !== true) {
          while ((i > arraySave.length) && (arraySave[i] != link)) {
            console.log("i: ",i);
            console.log("arraySave.length: ", arraySave.length);
            console.log("arraySave[",i,"]",arraySave[i]);
            console.log("element recherché: ",link);

            i++;
          }
          if (arraySave[i]==link) {
            console.log("test");
            for (var j = i; j <= localStorage.length; j++) {
              arraySave[j] = arraySave[j+1];
            }
          }
        }
        // button.removeChild();
      });
    });
  }
}
