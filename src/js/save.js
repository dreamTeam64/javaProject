function save() {
  if (window.location.hash == "#home") {
    var button = document.getElementById("saveRssLink");
    var rssLink = document.getElementById("rss_link");
    var arraySave;
    button.addEventListener('click',function (e) {
      if (e.handled !== true) {
        arraySave = JSON.parse(localStorage.getItem("link"));
        if ((arraySave === null) ||(arraySave === undefined)) {
          arraySave = [];
        }
        if (typeof(Storage) !== "undefined") {
          for (var i = 0; i < arraySave.length; i++) {
            if (arraySave[i-1] === arraySave[i]) {
              arraySave.length = arraySave.length -2;
            }
          }
          arraySave.push(rssLink.value);
          localStorage.setItem("link",JSON.stringify(arraySave));

        } else {
          window.alert("no support of storage on your browser");
        }
      }
      e.handled = true;
      e.preventDefault();
    },false);
  }
}
