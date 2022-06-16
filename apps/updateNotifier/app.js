var settings = Object.assign({
    showInMessagesApp: false,
    showWidget: true,
    checkOnBoot: true,
    sheaduler: true,
    showDebug: true,
    updates: [],
    downloadURL: "https://banglejs.com/apps/", //https://espruino.github.io/BangleApps/
  }, require('Storage').readJSON("updateNotifier.settings.json", true) || {});
  
  
  
  Bangle.loadWidgets();
  Bangle.drawWidgets();
  
  
  var appCount = -1;
  var newApps = [];
  var downloadRunning = false;
  var s = require("Storage");
  var apps = s.list(/\.info$/).map(app=>{
    var a=s.readJSON(app,1);
    return a  && {
      id: a.id, version: a.version,
    };
  });
  
  function startDownload() {
    appCount = apps.length;
    if(appCount > 0) {
      downloadRunning = true;
      downloadApp(apps[appCount - 1].id);
    }
  }
  
  
  function downloadApp(appID) {
    if(settings.showDebug)
      E.showMessage("check updates " + (appCount) + " left");
    appCount = appCount - 1;
    Bluetooth.println(JSON.stringify({t:"http", url: settings.downloadURL + "apps/" + appID + "/metadata.json" }));
  }
  
  function getApp(appID) {
    return apps.find(app => app.id == appID);
  }
  
  function compareApp(newApp) {
    if(newApp.version > getApp(newApp.id).version) {
      newApps.push({
        id: app.id,
        name: app.name,
        version: app.version,
        oldVersion: getApp(app.id).version
      });
    }
  }
  
  function complete() {
    if(settings.showDebug)
      E.showMessage("complete " + newApps.length);
    downloadRunning = false;
    if(newApps.length <= 0)
      return;
  
    sendMessagesApp('new Updates available', newApps.length + ' updates Available:' + getNewAppsList());
    saveNewApps();
  }
  
  function getNewAppsList() {
    return newApps.map(app => '\n\n' + app.name + ' (' + app.oldVersion + '->' + app.version + ')');
  }
  
  function sendMessagesApp(title, message) {
    if(!settings.showInMessagesApp)
      return;
  
    const event = {
      id: Math.floor(Math.random() * 10000),
      t:'add',
      src: 'updateNotifier',
      title: title,
      body: message,
    };
    require("messages").pushMessage(event);
  }
  
  function saveNewApps() {
    settings = require('Storage').readJSON("updateNotifier.settings.json", true);
    settings.updates = newApps;
    require('Storage').writeJSON("updateNotifier.settings.json", settings);
  }
  
  require("sched").setAlarm("downloadApps", {
    appid : "updateNotifier",
    on : false,
    t : 20 * 53 * 30 * 1000,
    dow : 0b1111111,
    rp : true,
    js : "load('setting.app.js')",
  });
  
  // Sheaduler einstellen
  
  
  // Widget
  
  global.GB = (event) => {
    if(event.t == "http" && downloadRunning) {
      if(appCount <= 0) {
        complete();
        return;
      }
  
      if(!event.err)
        compareApp(JSON.parse(event.resp));
  
      downloadApp(apps[appCount - 1].id);
    }
  };
  
  //Menue
  (function(back) {
    var FILE = "updateNotifier.settings.json";
    // Load settings
    var settings = Object.assign({
      showInMessagesApp: false,
      showWidget: true,
      checkOnBoot: true,
      sheaduler: true,
      showDebug: true,
      updates: [],
      downloadURL: "https://banglejs.com/apps/", //https://espruino.github.io/BangleApps/
    }, require('Storage').readJSON(FILE, true) || {});
  
    function writeSettings() {
      require('Storage').writeJSON(FILE, settings);
    }
  
    // Show the menu
    E.showMenu({
      "" : { "title" : "Update Notifier" },
      "< Back" : () => back(),
      "Manual Check" : function() {
        if(!settings.showDebug)
          E.showMessage("check updates started");
        startDownload();
      },
      'Show in Messages': {
        value: !!settings.showInMessagesApp,
        format: v => v?"On":"Off",
        onchange: v => {
          settings.showInMessagesApp = v;
          writeSettings();
        }
      },
      'Show Widget': {
        value: !!settings.showWidget,
        format: v => v?"On":"Off",
        onchange: v => {
          settings.showWidget = v;
          writeSettings();
        }
      },
      'Show Debug messages': {
        value: !!settings.showDebug,
        format: v => v?"On":"Off",
        onchange: v => {
          settings.showDebug = v;
          writeSettings();
        }
      },
      'Check on Boot': {
        value: !!settings.checkOnBoot,
        format: v => v?"On":"Off",
        onchange: v => {
          settings.checkOnBoot = v;
          writeSettings();
        }
      },
    });
  })(load);
  