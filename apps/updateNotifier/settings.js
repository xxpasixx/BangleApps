(function (back) {
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
    "": { "title": "Update Notifier" },
    "< Back": () => back(),
    "Manual Check": function () {
      if (!settings.showDebug)
        E.showMessage("check updates started");
      //()=>load("updateNotifier.app.js");
      startDownload();
    },
    'Show in Messages': {
      value: !!settings.showInMessagesApp,
      format: v => v ? "On" : "Off",
      onchange: v => {
        settings.showInMessagesApp = v;
        writeSettings();
      }
    },
    // 'Show Widget': {
    //   value: !!settings.showWidget,
    //   format: v => v ? "On" : "Off",
    //   onchange: v => {
    //     settings.showWidget = v;
    //     writeSettings();
    //   }
    // },
    'Show Debug messages': {
      value: !!settings.showDebug,
      format: v => v ? "On" : "Off",
      onchange: v => {
        settings.showDebug = v;
        writeSettings();
      }
    },
    // 'Check on Boot': {
    //   value: !!settings.checkOnBoot,
    //   format: v => v ? "On" : "Off",
    //   onchange: v => {
    //     settings.checkOnBoot = v;
    //     writeSettings();
    //   }
    // },
  });
})
