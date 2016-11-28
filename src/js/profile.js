function userRss () {
  if (window.location.hash == "#home") {
    var link,button;
    link = document.getElementById('rss_link');
    button = document.getElementById('sendRssLink');

    console.log(button);

    button.addEventListener("click",function(){
      var flux;
      var tabItem;
      var containerRssFeed = document.getElementById("rssFeed");

      flux = Object.create(rss);
      console.log(flux);
      flux.init(link.value);
      flux.getVersion(function(version){
        flux.getItems(function(tabItem){
          console.log(tabItem);
          for (var i = 0; i < tabItem.length; i++) {
            var media,title,description,division,date,hr;
            var item = Object.create(Item);
            item.init(tabItem[i]);
            media = document.createElement('button');
            media.class = "btn btn-default";
            media.innerHTML = "Ouvrir";
            media.url = item.getEnclosureType();

            // if (item.getEnclosureType() == "audio/mpeg") {
            //
            //   media = document.createElement('AUDIO');
            //   media.controls="controls";
            //   media.preload = "false";
            //   media.src = item.getEnclosureContent();
            // } else if (item.getEnclosureType() == "image/jpg" || item.getEnclosureType() == "image/jpeg"){
            //   media = document.createElement('img');
            //   media.width = 100;
            //   media.height = 100;
            //   media.src = item.getEnclosureContent();
            // } else if (item.getEnclosureType()== "video/x-m4v"){
            //   var source;
            //   media = document.createElement('video');
            //   media.controls="controls";
            //   media.width = 400;
            //   media.height = 222;
            //   source = document.createElement('source');
            //   source.src = item.getEnclosureContent();
            //   source.type = item.getEnclosureType();
            //   media.appendChild(source);
            // }

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
            division.appendChild(media);
            division.appendChild(hr);
            containerRssFeed.appendChild(division);
          }
        });

      });
    });
  }
}
