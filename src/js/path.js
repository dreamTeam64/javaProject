function createPageFromTemplate(template) {
  var container;
  var toInsert;

  console.log(template);

  container = document.getElementById('container');
  container.innerHTML = "";
  toInsert = template.getElementById('main');
  container.appendChild(toInsert);
}

function loadTemplate(name){
  var req = new XMLHttpRequest();
  console.log(name);
  req.open("GET","./template/"+name.slice(1,name.length)+".html",true);
  req.responseType = 'document';
  req.overrideMimeType('text/html');
  req.onerror = function () {
    console.log("erreur de chargement de " + name);
  };

  req.onload = function(){
    if(req.status === 200) {
      var template = req.responseXML;
      console.log(template);
      createPageFromTemplate(template);
    } else {
      console.log("Error"+ req.status);
    }
  };
  req.send();
}

window.onload = function () {
  if (window.location.hash === '') {
    window.location.hash = "home";
  }
  loadTemplate(window.location.hash);
};

window.onhashchange = function () {
  loadTemplate(window.location.hash);
};
