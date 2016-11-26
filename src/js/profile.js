function userRss () {
  if (window.location.hash == "#home") {
    var link,button;
    link = document.getElementById('rss_link');
    button = document.getElementById('sendRssLink');

    console.log(button);

    button.addEventListener("click",function(){
      var flux;
      var tabItem;
      var tableauHTML = document.getElementById("tableau");

      flux = Object.create(rss);
      console.log(flux);
      flux.init(link.value);

      flux.getItems(function(tabItem){
        console.log(tabItem);
        for (var i = 0; i < tabItem.length; i++) {
          var tbody,tr,td,td_2,td_3;
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
          }
          media.src = item.getEnclosureContent();
          tr = document.createElement('tr');
          td = document.createElement('td');
          td_2 = document.createElement('td');
          td_3 = document.createElement('td');
          tbody = document.createElement('tbody');
          td_2.innerHTML = item.getPublicationDate();
          td.innerHTML = item.getTitle();
          td_3.appendChild(media);
          tr.appendChild(td_2);
          tr.appendChild(td);
          tr.appendChild(td_3);
          console.log(media);

          tbody.appendChild(tr);
          tableauHTML.appendChild(tbody);
        }
        console.log(tabItem);
      });
    });
  }
}
