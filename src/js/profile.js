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

      flux.getItems(function(tabItem){
        console.log(tabItem);
        for (var i = 0; i < tabItem.length; i++) {
          var media,title,description,division,date,hr;
          var item = Object.create(Item);
          item.init(tabItem[i]);

          if (item.getEnclosureType() == "audio/mpeg") {
            media = document.createElement('AUDIO');
            media.controls="controls";
            media.preload = "false";
          } else if (item.getEnclosureType() == "image/jpg" || item.getEnclosureType() == "image/jpeg"){
            media = document.createElement('img');
            media.width = 100;
            media.height = 100;
          } else if (item.getEnclosureType()== "video/mp4"){
            media = document.createElement('video');
          }

          division = document.createElement('div');
          title = document.createElement('h3');
          description = document.createElement('p');
          date = document.createElement('p');
          hr = document.createElement('hr');

          title.innerHTML = item.getTitle();
          date.innerHTML = item.getPublicationDate();
          description.innerHTML = item.getDescription();
          division.appendChild(title);
          division.appendChild(date);
          division.appendChild(description);
          division.appendChild(media);
          division.appendChild(hr);
          containerRssFeed.appendChild(division);
        }
      });
    });
  }
}
