/*jshint esversion: 6 */
/*jshint loopfunc: true */

function triFluxRss(){
  var rssFeed = document.getElementById('rssFeed');
  var array = [];
  array = rssFeed.getElementsByTagName('div');
  console.log(array);

  var min;
  var i,j;
  var date;
  var elt;

  elt = array[0];
  console.log(elt);
  //console.log(elt.getElementsByName('datePodcast')[0]);
  //console.log((elt.getElementById('datePodcast')).innerHTML);
  for (i = 0; i < (array.length)-1; i++) {
    min = array[i];
    for (j = i+1; j < array.length; j++) {

    }
  }
}

function pushFlux(link){
  var flux;
  var tabItem;
  var containerRssFeed = document.getElementById("rssFeed");
  console.log("t'essaie d'introduire le flux : " + link);
  flux = Object.create(rss);
  console.log(flux);
  flux.init(link);
  flux.getVersion(function(version){
    flux.getItems(function(tabItem){
      console.log(tabItem);
      for (let i = 0; i < 10; i++) {
        var media,button,title,description,division,date,hr;
        var item = Object.create(Item);
        item.init(tabItem[i]);
        button = document.createElement('button');
        button.className = "btn btn-default";
        button.innerHTML = "Ouvrir";

        button.addEventListener('click',function(){
          var item = Object.create(Item);
          item.init(tabItem[i]);
          document.getElementById('modalTitle').innerHTML = item.getTitle();
          document.getElementById('modalLink').href = item.getLink();
          document.getElementById('modalDesc').innerHTML = item.getDescription().innerHTML;
          this.className = "btn btn-outline-secondary ";
          var modal = document.getElementById("modalBody");
          modal.innerHTML = '';
          if (item.getEnclosureType() == "audio/mpeg") {
            media = document.createElement('AUDIO');
            media.controls="controls";
            media.preload = "false";
            media.src = item.getEnclosureContent();
          } else if (item.getEnclosureType() == "image/jpg" || item.getEnclosureType() == "image/jpeg"){
            media = document.createElement('img');
            media.width = 100;
            media.height = 100;
            media.src = item.getEnclosureContent();
          } else if (item.getEnclosureType()== "video/x-m4v" || item.getEnclosureType()== "video/mp4"){
            var source;
            media = document.createElement('video');
            media.controls="controls";
            media.width = 400;
            media.height = 222;
            source = document.createElement('source');
            source.src = item.getEnclosureContent();
            source.type = item.getEnclosureType();
            media.appendChild(source);
          }
          modalBody.appendChild(media);
          $('#AlertBox').modal('show');
          $('#AlertBox').on('hide.bs.modal',function(e){
            console.log(media.nodeName);
            if (media.nodeName === "AUDIO" || media.nodeName === "video") {
              media.pause();
            }
          });
        });

        division = document.createElement('div');
        title = document.createElement('h3');
        description = document.createElement('p');
        date = document.createElement('p');
        date.name = "datePodcast";
        hr = document.createElement('hr');

        console.log(item.getDescription());

        title.innerHTML = item.getTitle();

        date.innerHTML = item.getPublicationDate();
        description.appendChild = item.getDescription();
        division.appendChild(title);
        division.appendChild(date);
        division.appendChild(description);
        division.appendChild(button);
        division.appendChild(hr);
        containerRssFeed.appendChild(division);
        triFluxRss();
      }
    });
  });
}

function userRss () {
  if (window.location.hash == "#home") {
    var link,button, rssFeed;
    link = document.getElementById('rss_link');
    button = document.getElementById('sendRssLink');
    rssFeed = document.getElementById('rssFeed');
    console.log(button);

    button.addEventListener("click",function(e){
      rssFeed.innerHTML = "";
      if(e.handled !== true){
        pushFlux(link.value);
      }
      e.handled = true;
      e.preventDefault();
    },false);
  }
}

function loadFav(){
  var favDiv,localData, rssFeed;

  rssFeed = document.getElementById('rssFeed');
  localData = JSON.parse(localStorage.getItem("link"));
  console.log(localData);
  favDiv = document.getElementById('fav');
  if (localData !== null) {
    for (let i = 0; i < localData.length; i++) {
      var link,flux,div,del;
      pushFlux(localData[i]);
      flux = Object.create(rss);
      flux.init(localData[i]);
      console.log("état de la variable i : " + i);
      flux.getTitleChanel(function(title){
        del = document.createElement('button');
        div = document.createElement('div');
        link = document.createElement('span');
        del.innerHTML = "del";
        del.name = "del";
        del.className = "btn btn-default btn-xs";
        link.innerHTML = title+ " ";
        link.href = localData[i];
        div.appendChild(link);
        div.appendChild(del);
        favDiv.appendChild(div);
        link.addEventListener("click",function(){
          rssFeed.innerHTML = "";
          console.log(localData[i]);
          pushFlux(localData[i]);
        });
      });
    }
  } else {
    localStorage.setItem("link",JSON.stringify([]));
  }
}
