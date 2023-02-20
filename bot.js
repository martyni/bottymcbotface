const tmi = require('tmi.js');
const creds = require('./creds.js');
const http = require('http');


// Create a client with our options
const client = new tmi.client(creds.opts);
const WEB_URL = "http://127.0.0.1:5000"
const EMOJI_URL = "http://emote.askmartyn:5000/channel/"

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  sendComment(`${context.username}`, `${msg}`); 


  addChannel = new RegExp('\!channel (.*)');
  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!nerd'){
    client.say(target, callNerd());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!warn'){
    client.say(target, contentWarnings());
    client.say(target, generalWarnings());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!fluid'){
    client.say(target, fluid());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!slorp'){
    client.say(target, fluid());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!balls'){
    no_balls = balls()	  
    client.say(target, no_balls);
    sendComment(`* ${context.username}`,`${no_balls}`);
  } else if (commandName === '!eelee'){
    no_eelee = eelee()	   
    client.say(target, no_eelee);
    sendComment(`* ${context.username}`,`${no_eelee}`);
  } else if (commandName === '!links'){
    client.say(target, links());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!shop'){
    client.say(target, shop());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName === '!crimeslist'){
    client.say(target, crimesList());
    sendComment(`* ${context.username}`,` Executed ${commandName} command`);
  } else if (commandName.re(addChannel)){
    match = commandName.re(addChannel);  
    channel = match[1];  
    client.say(target, crimesList());
    addEmojiChannel(channel);
    sendComment(`* ${context.username}`,` Executed ${commandName} for ${channel}`);
  } else {
    console.log(`* ${context.username}: ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}


function crimesList() {
  const commandArray = ['channel', 'dice','eelee', 'nerd', 'balls', 'fluid','warn', 'links', 'shop', 'slorp'];
  commandString = "!";
  commandArray.forEach(element => {
	  commandString = commandString + element + ", !";
    }
  );
  return commandString;
}

function callNerd () {
  const your = randomChoice(['your', 'ur', 'you\'re', 'you are', 'u are', 'thou art' ]);
  const nerd = randomChoice(['nerd','newt', 'nord', 'nearrrrd','NERD!!', 'nooooooord', 'naaaard']);	
  return `${your} a ${nerd}!`;
}

function fluid () {
  const wet = randomChoice(['wet', 'moisten', 'fluid', 'slorp', 'wazz', 'spit', 'squirt' ])
  return `${wet} yourself!`;
}

function balls () {
  const numberOfBalls = Math.floor(Math.random() * 69)
  const ball_string = "askmar1Lookballs ".repeat( numberOfBalls );
  const end_string = `There were ${numberOfBalls} balls`
  return ball_string + end_string;
}

function eelee () {
  const numberOfEelees = Math.floor(Math.random() * 69)
  const eeleeString = "askmar1Eelee ".repeat( numberOfEelees );
  const endString = `I love you ${numberOfEelees} many eelees `
  return eeleeString + endString;
}

function links () {
  const linkString = `https://linktr.ee/askmartyn`;
  return linkString;
}

function shop () {
  const shopString = `https://redbubble.com/people/martyni/shop`;
  return shopString;
}
function contentWarnings () {
  const warning = `FLASHING IMAGES AND BRIGHT COLOURS people with photosensitivity or who have sensory overload may need to look elsewhere. You have been warned`;	
  return warning;
}
function contentWarnings () {
  const warning = `FLASHING IMAGES AND BRIGHT COLOURS people with photosensitivity or who have sensory overload may need to look elsewhere. You have been warned`;	
  return warning;
}

function generalWarnings () {
  const general = `The askMartyn channel is a LGBTQ+, sex positive stream for people who don't mind rude words, innuendo, bad behavior and general naughtiness. As such you may read or hear something that you find offensive. We will not tolerate hate speech, racism, transphobia or people being dicks (you know who you are) zero tolerance.  You have been warned`;
  return general;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  sendComment('BottymcBotface', `* Connected to ${addr}:${port}`);
}

// Function for random choice
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function sendComment(username, comment) {
    url = WEB_URL + '/comment?username='+ username + '&comment=' + comment;
    http.get(url, (resp) =>{
       console.log(url);
    });
}

function addEmojiChannel(channel) {
    url = EMOJI_URL + channel;
    http.get(url, (resp) =>{
       console.log(url);
    });
}

