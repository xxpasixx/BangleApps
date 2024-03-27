// This file is auto-generated - DO NOT MODIFY
// If you want to add icons, change icons/icon_names.json and re-run icons/generate.js
exports.getImage = function(msg) {
  if (msg.img) return atob(msg.img);
  let s = (("string"=== typeof msg) ? msg : (msg.src || "")).toLowerCase();
  if (msg.id=="music") s="music";
  let match = ",default|0,airbnb|1,alarm|2,alarmclockreceiver|2,amazon shopping|3,bibel|4,bitwarden|5,1password|5,lastpass|5,dashlane|5,bring|6,calendar|7,etar|7,chat|8,chrome|9,clock|2,corona-warn|10,bmo|11,desjardins|11,rbc mobile|11,nbc|11,rabobank|11,scotiabank|11,td (canada)|11,discord|12,drive|13,element|14,facebook|15,messenger|16,firefox|17,firefox beta|17,firefox nightly|17,f-droid|5,neo store|5,aurora droid|5,github|18,gitlab|19,gmx|20,google|21,google home|22,google play store|23,home assistant|24,instagram|25,jira|26,kalender|27,keep notes|28,lieferando|29,linkedin|30,maps|31,organic maps|31,osmand|31,mastodon|32,fedilab|32,tooot|32,tusky|32,mattermost|33,n26|34,netflix|35,news|36,cbc news|36,rc info|36,reuters|36,ap news|36,la presse|36,nbc news|36,nextbike|37,nina|38,outlook mail|39,paypal|40,phone|41,plex|42,pocket|43,post & dhl|44,proton mail|45,reddit|46,sync pro|46,sync dev|46,boost|46,infinity|46,slide|46,signal|47,molly|47,skype|48,slack|49,snapchat|50,starbucks|51,steam|52,teams|53,telegram|54,telegram foss|54,threema|55,threema libre|55,tiktok|56,to do|57,opentasks|57,tasks|57,transit|58,twitch|59,twitter|60,uber|61,lyft|61,vlc|62,warnapp|63,whatsapp|64,wordfeud|65,youtube|66,newpipe|66,zoom|67,meet|67,music|68,sms message|0,mail|0,gmail|0,".match(new RegExp(`,${s}\\|(\\d+)`))
  return require("Storage").read("messageicons.img", (match===null)?0:match[1]*76, 76);
};

exports.getColor = function(msg,options) {
  options = options||{};
  var st = options.settings || require('Storage').readJSON("messages.settings.json", 1) || {};
  if (options.default===undefined) options.default=g.theme.fg;
  if (st.iconColorMode == 'mono') return options.default;
  const s = (("string"=== typeof msg) ? msg : (msg.src || "")).toLowerCase();
  return {
    /* generic colors, using B2-safe colors */ 
    "airbnb": "#ff385c", // https://news.airbnb.com/media-assets/category/brand/
    "mail": "#ff0",
    "music": "#f0f",
    "phone": "#0f0",
    "sms message": "#0ff", 
    "bibel": "#54342c",
    "bring": "#455a64",
    "discord": "#5865f2", // https://discord.com/branding
    "etar": "#36a18b",
    "facebook": "#1877f2", // https://www.facebook.com/brand/resources/facebookapp/logo
    "gmail": "#ea4335",
    "gmx": "#1c449b",
    "google": "#4285F4",
    "google home": "#fbbc05",
// "home assistant": "#41bdf5", // ha-blue is #41bdf5, but that's the background
    "instagram": "#ff0069", // https://about.instagram.com/brand/gradient
    "jira": "#0052cc", //https://atlassian.design/resources/logo-library
    "lieferando": "#ff8000",
    "linkedin": "#0a66c2", // https://brand.linkedin.com/
    "messenger": "#0078ff",
    "mastodon": "#563acc", // https://www.joinmastodon.org/branding
    "mattermost": "#00f",
    "n26": "#36a18b",
    "nextbike": "#00f",
    "newpipe": "#f00",
    "nina": "#e57004",
    "opentasks": "#409f8f",
    "outlook mail": "#0078d4", // https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products
    "paypal": "#003087",
    "pocket": "#ef4154f", // https://blog.getpocket.com/press/
    "post & dhl": "#f2c101",
    "reddit": "#ff4500", // https://www.redditinc.com/brand
    "signal": "#3a76f0", // https://github.com/signalapp/Signal-Desktop/blob/main/images/signal-logo.svg
    "skype": "#0078d4", // https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products
    "slack": "#e51670",
    "snapchat": "#ff0",
    "steam": "#171a21",
    "teams": "#6264a7", // https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/products
    "telegram": "#0088cc",
    "telegram foss": "#0088cc",
    "to do": "#3999e5",
    "twitch": "#9146ff", // https://brand.twitch.tv/
    "twitter": "#1d9bf0", // https://about.twitter.com/en/who-we-are/brand-toolkit
    "vlc": "#ff8800",
    "whatsapp": "#4fce5d",
    "Whatsapp Business": "#4fce5d",
    "wordfeud": "#e7d3c7",
    "youtube": "#f00", // https://www.youtube.com/howyoutubeworks/resources/brand-resources/#logos-icons-and-colors
  }[s]||options.default;
};
  