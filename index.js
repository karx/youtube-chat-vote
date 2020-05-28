var config = require('./config.json');
var mqtt = require('mqtt')
var client = mqtt.connect('http://api.akriya.co.in');
const YouTube = require('youtube-live-chat');
const yt = new YouTube('UCb2pAq3LgaUe9IcxjlFBkew', config["yt-api-key"]);

console.log('looking for ' + config["channel-di"]);
yt.on('ready', () => {
  console.log('ready!')
  yt.listen(1000)
})

yt.on('message', data => {
  console.log(data.snippet.displayMessage)
  let msg = data.snippet.displayMessage;
  
  switch(msg) {
    case "prison":
    case "military":
    case "school":
    case "mylta":
    case "george":
        sendVote(msg);
        break;
    default: ;
  }
})

yt.on('error', error => {
  console.error('error')
  console.error(error)
})


client.on('connect', function () {
    
    // client.publish('HS/303385001/status','11110000');
    // client.publish('homeSwitch/ready/2761046813','sReady!');
    console.log("published");
    
    client.subscribe('pubgmapv/server/admin', function (err) {
        if (!err) {
            console.log('subbed');
            client.publish('hoenn/presence', 'Connected-yt-bot')
        } else {
            console.error(err);
        }
    });
    
    
});


client.on('message', function (topic, message) {
    // message is Buffer
    console.log(`${topic}: ${message.toString()}`);
    if (topic === 'pubgmapv/server/admin') {
        console.log('something imp');
    }
});

function sendVote(loc) {
    try {
        client.publish('pubgmapv/vote', loc)
    } catch (error) {
        
    }
}