Bangle.loadWidgets();
Bangle.drawWidgets();

eval(require("Storage").read("updateNotifier.settings.js"))(() => load());
