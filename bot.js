const tmi = require('tmi.js');
const creds = require('./creds.js');


// Create a client with our options
const client = new tmi.client(creds.opts);

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

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!nerd'){
    client.say(target, callNerd());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!warn'){
    client.say(target, contentWarnings());
    client.say(target, generalWarnings());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!fluid'){
    client.say(target, fluid());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!balls'){
    client.say(target, balls());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!links'){
    client.say(target, links());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!shop'){
    client.say(target, shop());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else if (commandName === '!crimeslist'){
    client.say(target, crimesList());
    console.log(`* ${context.username}: Executed ${commandName} command`);
  } else {
    console.log(`* ${context.username}: ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function crimesList() {
  const commandArray = ['dice', 'nerd', 'balls', 'fluid','warn', 'links', 'shop'];
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
  const wet = randomChoice(['wet', 'moisten', 'fluid', 'slorp', 'wazz', 'spit' ])
  return `${wet} yourself!`;
}

function balls () {
  const numberOfBalls = Math.floor(Math.random() * 50)
  const ball_string = "askmar1Lookballs ".repeat( numberOfBalls );
  const end_string = `There were ${numberOfBalls} balls`
  return ball_string + end_string;
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
}

// Function for random choice
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}
