function getJSON(name){
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("GET","./data/"+name+".json",true);
    req.onerror = function () {
      console.log("erreur de chargement du fichier json");
    };
    req.onload = function(){
      if(req.status === 200) {
        var data = JSON.parse(req.responseText);
        console.log(data);
        resolve(data);
      } else {
        reject(Error("Error"+ req.status));
      }
    };
    req.send();
  });
}

function dataHome () {
  var dataHome;

  getJSON("home").then(function(response){
    for (var i = 0; i < response.radio.length; i++) {
      console.log(response.radio[i].name);
    }
  },function(Error){
    console.log("Error");
  });



}

function loadPage(name){
  switch (name) {
    case '#home':
      console.log("va pour dataHome");
      dataHome();
      break;
    default:
      console.log("humhum !");
  }
}
