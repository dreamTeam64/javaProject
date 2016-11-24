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
        },function(Error){

        });
    });
  }
}
