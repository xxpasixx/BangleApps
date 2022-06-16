Bangle.loadWidgets();
Bangle.drawWidgets();
Bluetooth.println(JSON.stringify({t:"info", msg:"Hello World"}));
eval(require("Storage").read("updateNotifier.settings.js"))(() => load());
