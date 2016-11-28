var rss = {
  init: function (url) {
    this.url = url;
  },
  getXmlDoc: function (callback) {
    getXML(this.url).then(function (response) {
      callback(response);
    }, function (Error) {
      console.log(Error);
    });
  },
  getItems: function (callback) {
    getXML(this.url).then(function (response) {
      callback(response.getElementsByTagName('item'));
    }, function (Error) {
      console.log(Error);
    });
  },
  getVersion: function (callback) {
    getXML(this.url).then(function (response) {
      callback(response.getElementsByTagName('rss')[0].getAttribute('version'));
    }, function (Error) {
      console.log(Error);
    });
  },
  getTitleChanel: function (callback) {
    getXML(this.url).then(function (response) {
      callback(response.getElementsByTagName('title')[0].innerHTML);
    }, function (Error) {
      console.log(Error);
    });
  },
  getDescription: function (callback) {
    getXML(this.url).then(function (response) {
      callback(response.getElementsByTagName('description')[0].innerHTML);
    }, function (Error) {
      console.log(Error);
    });
  }
};
