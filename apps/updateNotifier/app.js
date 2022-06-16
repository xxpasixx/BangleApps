var settings = Object.assign({
  showInMessagesApp: false,
  showWidget: true,
  checkOnBoot: true,
  sheaduler: true,
  showDebug: true,
  updates: [],
  downloadURL: "https://banglejs.com/apps/", //https://espruino.github.io/BangleApps/
}, require('Storage').readJSON("updateNotifier.settings.json", true) || {});

//TODO: Remove
settings.downloadURL = "https://xxpasixx.github.io/BangleApps/";

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
    E.showMessage("check updates " + (appCount) + " left (" +appID + ')');
  appCount = appCount - 1;
  Bluetooth.println(JSON.stringify({t:"http", url: settings.downloadURL + "apps/" + appID + "/metadata.json" }));
}

function getApp(appID) {
  return apps.find(app => app.id == appID);
}

function compareApp(newApp) {
  if(newApp.version > getApp(newApp.id).version) {
    newApps.push({
      id: newApp.id,
      name: newApp.name,
      version: newApp.version,
      oldVersion: getApp(newApp.id).version
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
eval(require("Storage").read("android.settings.js"))(()=>load());