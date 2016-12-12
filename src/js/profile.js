function userRss () {
  if (window.location.hash == "#home") {
    var link,button;
    link = document.getElementById('rss_link');
    button = document.getElementById('sendRssLink');

    console.log(button);

    button.addEventListener("click",function(e){
      var flux;
      var tabItem;
      var containerRssFeed = document.getElementById("rssFeed");

      flux = Object.create(rss);
      console.log(flux);
      flux.init(link.value);
      flux.getVersion(function(version){
        flux.getItems(function(tabItem){
          console.log(tabItem);
          for (var i = 0; i < 1; i++) {
            var media,button,title,description,division,date,hr;
            var item = Object.create(Item);
            item.init(tabItem[i]);
            button = document.createElement('button');
            button.className = "btn btn-default";
            button.innerHTML = "Ouvrir";

            button.addEventListener('click',function(){
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
                media.pause();
              });
            });

            division = document.createElement('div');
            title = document.createElement('h3');
            description = document.createElement('p');
            date = document.createElement('p');
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
          }
        });
        e.stopPropagation();
        e.preventDefault();
        return false;
      });

    });
  }
}

function loadFav(){
  var favDiv,localData;

  localData = JSON.parse(localStorage.getItem("link"));
  console.log(localData);
  favDiv = document.getElementById('fav');

  for (var i = 0; i < localData.length; i++) {
    var link,flux;
    flux = Object.create(rss);
    flux.init(localData[i]);
    flux.getTitleChanel(function(title){
      link = document.createElement('a');
      link.innerHTML = title + "<br>";
      link.href = localData[i];
      favDiv.appendChild(link);
    });
  }

}
