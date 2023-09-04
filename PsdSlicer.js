var PSD = require('psd');
var psd = PSD.fromFile("C:\\Users\\gamin\\Downloads\\PSDs-20220701T174121Z-002\\PSDs\\Backgrounds [1920x1080px 72dpi]\\Forest Glade\\ForestGlade(Ver11).psd");
psd.parse();

console.log(psd.tree().export());
