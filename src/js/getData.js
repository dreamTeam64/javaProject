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
  var encartContainer;

  encartContainer = document.getElementById('encart-container');

  console.log(encartContainer);

  getJSON("home").then(function(response){
    for (var i = 0; i < response.radio.length; i++) {
      var encart,img,link;
      console.log(response.radio[i].name);
      encart = document.createElement('div');
      encart.id = "encart-radio";
      encart.innerHTML = response.radio[i].name + "</br>";
      link = document.createElement('a');
      img = document.createElement('img');
      img.height = 100;
      img.width = 100;
      img.src = response.radio[i].img;
      link.href = response.radio[i].inter_link;
      link.appendChild(img);
      encart.appendChild(link);
      console.log(encart);
      encartContainer.appendChild(encart);
    }
  },function(Error){
    console.log("Error");
  });
}

function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function dataRadio () {
  var radio;

  radio = obtenirParametre("radio");
  console.log(radio);
}

function loadPage(name){
  switch (name) {
    case '#home':
      console.log("va pour dataHome");
      dataHome();
      break;
    case '#radio':
      console.log("va pour dataRadio");
      dataRadio();
      break;
    default:
      console.log("humhum !");
  }
}
