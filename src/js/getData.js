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

function getXML(url){
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("GET","https://crossorigin.me/"+url,true);
    req.onerror = function () {
      console.log("erreur de chargement du fichier xml");
    };
    req.onload = function(){
      if(req.status === 200) {
        var data = req.responseXML;
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
      encart.innerHTML = "<h5>"+response.radio[i].name + "</h5></br>";
      encart.className = "col-md-2 .col-sm-3";
      link = document.createElement('a');
      img = document.createElement('img');
      img.height = 40;
      img.width = 40;
      img.src = response.radio[i].img;
      link.href = response.radio[i].inter_link;
      link.appendChild(img);
      encart.appendChild(link);
      console.log(encart);
      encartContainer.appendChild(encart);
      userRss();
      save();
    }
  },function(Error){
    console.log("Error");
  });
}

function dataEmission () {
  var emission;
  var radio;
  var encartContainer;
  var url;

  radio = obtenirParametre("radio");
  emission = obtenirParametre("emission");

  console.log(radio);
  console.log(emission);

  getJSON("radio/"+radio).then(function(response){
    console.log(response.rss[emission]);
    url = response.rss[emission];
    getXML(url).then(function(response){
      var tabItem;
      var tableauHTML = document.getElementById("tableau");

      tabItem = response.getElementsByTagName("item");
      for (var i = 0; i < tabItem.length; i++) {
        var tbody,tr,td,td_2,td_3,audio;

        //console.log(tabItem[i].childNodes[1].innerHTML);
        //console.log(tabItem[i].childNodes[11].getAttribute('url'));

        audio = document.createElement('AUDIO');
        audio.src = tabItem[i].getElementsByTagName('enclosure')[0].getAttribute('url');
        audio.controls="controls";
        audio.preload = "false";
        tr = document.createElement('tr');
        td = document.createElement('td');
        td_2 = document.createElement('td');
        td_3 = document.createElement('td');
        tbody = document.createElement('tbody');
        td_2.innerHTML = i;
        td.innerHTML = tabItem[i].getElementsByTagName('title')[0].innerHTML;
        td_3.appendChild(audio);
        tr.appendChild(td_2);
        tr.appendChild(td);
        tr.appendChild(td_3);
        console.log(audio);

        tbody.appendChild(tr);
        tableauHTML.appendChild(tbody);
      }
      console.log(tabItem);
    },function(Error) {
      console.log(Error);
    });
  },function(Error){
    console.log("erreur !");
  });
}

function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function dataRadio () {
  var radio;
  var encartContainer;

  encartContainer = document.getElementById('encart-container');
  radio = obtenirParametre("radio");
  console.log(radio);

  getJSON("radio/"+radio).then(function(response){
    for (var i = 0; i < response.emission.length; i++) {
      console.log(response.emission[i].name);
      var encart,img,link;
      console.log(response.emission[i].name);
      encart = document.createElement('div');
      encart.id = "encart-radio";
      encart.innerHTML = response.emission[i].name + "</br>";
      encart.className = "col-md-6 .col-sm-3";
      link = document.createElement('a');
      img = document.createElement('img');
      img.height = 100;
      img.width = 100;
      img.src = response.emission[i].img;
      link.href = response.emission[i].inter_link;
      link.appendChild(img);
      encart.appendChild(link);
      console.log(encart);
      encartContainer.appendChild(encart);
    }
  },function(Error){
    console.log("error");
  });
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
    case '#emission':
      console.log("va pour dataEmission");
      dataEmission();
      break;
    default:
      console.log("humhum !");
  }
}
