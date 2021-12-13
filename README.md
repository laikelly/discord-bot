# AI-Bot
[link to bot](https://discord.com/api/oauth2/authorize?client_id=911006634564796456&permissions=67584&scope=bot)

## Description
This is a discord bot that returns information retrieved from the [TVmaze API](https://www.tvmaze.com/api)

### Functionalities/Commands
* !help - returns a list of commands and its functionalities
<img width="503" alt="Screen Shot 2021-12-05 at 4 56 07 PM" src="https://user-images.githubusercontent.com/44072717/144765475-81aae515-c823-42fa-a8a8-82ea4a3c9d99.png">
* !info - prompts the user to enter a name and returns personal information of the Actor/Actress user entered
<img width="690" alt="Screen Shot 2021-12-05 at 5 05 00 PM" src="https://user-images.githubusercontent.com/44072717/144765718-66a6eb7a-ae8c-4dcb-ae2a-ebdad595f360.png">

#### Example:
<img width="529" alt="Screen Shot 2021-12-05 at 5 05 08 PM" src="https://user-images.githubusercontent.com/44072717/144765720-1b38623b-9515-410a-9ee1-316fd59ac4b5.png">

## Procedure
### Step 1: Setting up a Discord server
* [Sign In](https://discord.com/login) or [Sign Up](https://discord.com/register) for a Discord account to begin. 
* Click the plus icon on the left of the screen to create a new server.
<img width="226" alt="Screen Shot 2021-12-12 at 11 50 56 PM" src="https://user-images.githubusercontent.com/44072717/145754473-f2007c82-2a3a-411b-ad1b-181933d5ca12.png">
* Next, click "Create My Own" and input the name of the server.

### Step 2: Registering the bot
* Go to the [Discord Developers Portal](https://discord.com/developers) and sign in with Discord account.
* Click on "New Applicaiton" located at top right and enter the name for the bot.
* After fillinf in the details of the bot, it will direct to the bot's dashboard. Navigate to "Bot" and click "Add Bot" to enable app as a bot.
<img width="1347" alt="Screen Shot 2021-12-13 at 12 10 36 AM" src="https://user-images.githubusercontent.com/44072717/145755886-aead32ab-e15f-4d2b-9e54-18d4cb99e752.png">
* Copy the bot's token and store it somewhere without revealing it to public.
<img width="1360" alt="Screen Shot 2021-12-13 at 12 13 10 AM" src="https://user-images.githubusercontent.com/44072717/145756088-362a35dd-583a-4a1d-94c3-9090621b60a7.png">

### Step 3: Installing bot to server
* Navigate to "General" under "OAuth2" and select "bot" under the Scopes section and select "Send Messages" and "Read Message History" as its permissions.
<img width="1411" alt="Screen Shot 2021-12-13 at 12 16 49 AM" src="https://user-images.githubusercontent.com/44072717/145756436-1f35240a-c6ae-4dfa-84bc-ec9efe5bf733.png">
* Navigate to "URL Generator" under "OAuth2" and repeat the previous step to retrieve the generated URL at the bottom
<img width="1045" alt="Screen Shot 2021-12-13 at 12 20 07 AM" src="https://user-images.githubusercontent.com/44072717/145756721-1f223f9f-8261-44c7-90f2-eafc5562fa59.png">
* Copy and paste the URL on a new browser tab to install the bot to a preferred Discord server

### Step 4: Setting up Project Folder
* [Set up Node.js](https://github.com/brondle/web-production-2/tree/main/week8)
* Create new project using following terminal commands
```
mkdir discordBot
cd discordBot
npm init
```
### Step 5: Installing npm packages
```
npm install discord.js axios dotenv
```
#### packages required:
* [discord.js](https://www.npmjs.com/package/discord.js) - a Node.js module to allow easy interactions with the Discord API.
* [axios](https://www.npmjs.com/package/axios) - allows making HTTP Promises easily with Node.js.
* [dotenv](https://www.npmjs.com/package/dotenv) - allows the usage of a .env file that holds the bot token

### Step 6: Setting up index.js
* In the project directory, run:
```
touch index.js
```
* Import the packages and create a new client:
```
require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios

const {Client,Intents} = require('discord.js'); //creates a new client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`); //displays when bot is added to server
});

//make sure this is the last line
client.login(process.env.TOKEN); //login bot using token
```
* Create an .env file and store the token in there. In the .env file:
```
TOKEN='your token here'
```
* Run the following command for the bot to go online:
```
node index.js
```

## Resources
Resources used in the coding process
* [bot setup](https://buddy.works/tutorials/how-to-build-a-discord-bot-in-node-js-for-beginners)
* [implementing axios](https://www.youtube.com/watch?v=fQqkaQSc8dI)
