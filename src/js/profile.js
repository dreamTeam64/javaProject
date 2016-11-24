function userRss () {
  if (window.location.hash == "#home") {
    var link,button;
    link = document.getElementById('rss_link');
    button = document.getElementById('sendRssLink');

    console.log(button);

    button.addEventListener("click",function(){
        console.log("wesh");
        getXML(link.value).then(function(response){
          var tabItem;
          var tableauHTML = document.getElementById("tableau");
          tabItem = response.getElementsByTagName("item");
          for (var i = 0; i < tabItem.length; i++) {
            var tbody,tr,td,td_2,td_3,media,type;

            //console.log(tabItem[i].childNodes[1].innerHTML);
            //console.log(tabItem[i].childNodes[11].getAttribute('url'));
            console.log(tabItem[i].getElementsByTagName('enclosure')[0].getAttribute('type'));
            type = tabItem[i].getElementsByTagName('enclosure')[0].getAttribute('type');
            if (type == "audio/mpeg") {
              console.log("met de l'audio gros");
              media = document.createElement('AUDIO');
              media.controls="controls";
              media.preload = "false";
            } else if (type == "image/jpg" || type == "image/jpeg"){
              media = document.createElement('img');
              media.width = 100;
              media.height = 100;

            }
            media.src = tabItem[i].getElementsByTagName('enclosure')[0].getAttribute('url');
            tr = document.createElement('tr');
            td = document.createElement('td');
            td_2 = document.createElement('td');
            td_3 = document.createElement('td');
            tbody = document.createElement('tbody');
            td_2.innerHTML = (tabItem[i].getElementsByTagName('pubDate')[0]).innerHTML;
            td.innerHTML = tabItem[i].getElementsByTagName('title')[0].innerHTML;
            td_3.appendChild(media);
            tr.appendChild(td_2);
            tr.appendChild(td);
            tr.appendChild(td_3);
            console.log(media);

            tbody.appendChild(tr);
            tableauHTML.appendChild(tbody);
          }
          console.log(tabItem);
        },function(Error){

        });
    });
  }
}
