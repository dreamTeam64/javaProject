var Item = {
  init: function(item){
    this.item = item;
  },
  getTitle: function(){
    return (this.item).getElementsByTagName('title')[0].innerHTML;
  },
  getEnclosureType: function(){
    return (this.item).getElementsByTagName('enclosure')[0].getAttribute('type');
  },
  getEnclosureContent: function(){
    return (this.item).getElementsByTagName('enclosure')[0].getAttribute('url');
  },
  getPublicationDate: function(){
    return (this.item).getElementsByTagName('pubDate')[0].innerHTML;
  },
  getDescription: function(){
    return (this.item).getElementsByTagName('description')[0].innerHTML;
  }
};
