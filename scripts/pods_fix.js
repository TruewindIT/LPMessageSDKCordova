const fs = require('fs');
const path = require('path');

module.exports = function(context) {

    console.log(context);

    var platformRoot = path.join(context.opts.projectRoot, 'platforms/ios');
    var podFile = path.join(platformRoot, 'Podfile');
    
    console.log("platformRoot: " + platformRoot);

    console.log("=========> Executing hook iOSBeforeInstall.js  <=========");

    console.log("Checking Cordova Podfile");

    console.log("Path do Podfile: " + podFile); 
    if (fs.existsSync(podFile)) {
      console.log("Podfile exists, updating...");
      fs.readFile(podFile, 'utf8', function (err,data) {
        console.log("Data: "+data);
          data='source \'https://github.com/LivePersonInc/iOSPodSpecs.git\''+data;
          
        if (err) {
          throw new Error('Unable to find Podfile: ' + err);
        }
          if (!data.includes("use_frameworks!")){
            data = data.replace(/ do/g, ' do\nuse_frameworks!');
          } 

          if (!data.includes("LPMessagingSDK")){
              data = data.replace(/end/g, 'pod \'LPMessagingSDK\', \'~> 4.1.0.0.710-Swift-5.1\'\nend');
            } 

            var result = data;

          console.log("Podfile DEPOIS: \n"+result);

          //console.log("=========> Editing Podfile on iOS <=========");

          fs.writeFile(podFile, result, 'utf8', function (err) {
            if (err) throw new Error('Unable to write into Podfile ' + err);
          });
      });
    } else {
        //create the file
    }
  }
