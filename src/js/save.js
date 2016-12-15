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
  if (window.location == "#home") {
    var button = document.getElementById("saveRssLink");
  }
}
