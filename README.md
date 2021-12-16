# AI-Bot
[link to bot](https://discord.com/api/oauth2/authorize?client_id=911006634564796456&permissions=67584&scope=bot)

## Description
This is a discord bot that returns information retrieved from the [TVmaze API](https://www.tvmaze.com/api)

### Functionalities/Commands
* !help - returns a list of commands and its functionalities
* !info - returns Actor/Actress personal information
* !gif - returns a random gif of Actor/Actress
* !search - returns information on a show

## Procedure
### Step 1: Setting up a Discord server
* [Sign In](https://discord.com/login) or [Sign Up](https://discord.com/register) for a Discord account to begin. 
* Click the plus icon on the left of the screen to create a new server.
<img width="226" alt="Screen Shot 2021-12-12 at 11 50 56 PM" src="https://user-images.githubusercontent.com/44072717/145754473-f2007c82-2a3a-411b-ad1b-181933d5ca12.png">
* Next, click "Create My Own" and input the name of the server.

### Step 2: Registering the bot
* Go to the [Discord Developers Portal](https://discord.com/developers) and sign in with Discord account.
* Click on "New Applicaiton" located at top right and enter the name for the bot.
* After filling in the details of the bot, it will direct to the bot's dashboard. Navigate to "Bot" and click "Add Bot" to enable app as a bot.
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
* Create an .env file and store the token in there. In the .env file: ([**Remember to hide the .env file on github**](https://stackoverflow.com/questions/1139762/ignore-files-that-have-already-been-committed-to-a-git-repository/1139797#1139797)
```
TOKEN='your token here'
```
* Run the following command for the bot to go online(locally):
```
node index.js
```
** Step 7: Creating bot commands
```
client.on('messageCreate', async msg => {
    if (msg.content === "!help") {
        const des = new MessageEmbed()
            .setColor(`#bee2e7`)
            .setDescription(`Below are the list of commands and functionalities:
                        *Format: ![command] [search term separated by spaces]*

                        **!info** - returns Actor/Actress personal information
                        **!gif** - returns a random gif of the Actor/Actress
                        **!search** - returns information on a show`)
            .setTitle(`AI - Bot`)
        msg.channel.send({
            embeds: [des]
        });
    }
    let tokens = msg.content.split(" ");
    if (tokens[0] === "!info") {
        let keywords = " ";
        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join("+");
            msg.channel.send(await getInfo(keywords));
        }
    }
    else if (tokens[0] === "!gif") {
        let keywords = " ";
        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join(" ");
            msg.channel.send(await getGif(keywords));
        }
    }
    else if (tokens[0] === "!search") {
        let keywords = " ";
        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join("+");
            msg.channel.send(await getShow(keywords));
        }
    }
});
```
** Step 8: Creating async functions and using axios to retrieve data from API
```
async function getInfo(name) {
    const res = await axios.get(`https://api.tvmaze.com/search/people?q=${name}`);
    const info = new MessageEmbed()
        .setColor(`#bee2e7`)
        .setAuthor('Actor/Actress Personal Information')
        .setTitle(`${res.data[0].person.name}`)
        .setURL(`${res.data[0].person.url}`)
        .setDescription(`**Gender:** ${res.data[0].person.gender}
        **Birthday:** ${res.data[0].person.birthday}
        **Born in:** ${res.data[0].person.country.name}`)
        .setThumbnail(`${res.data[0].person.image.medium}`)
        .setTimestamp()
    return {
        embeds: [info]
    };
}

async function getGif(name) {
    const res = await axios.get(`https://g.tenor.com/v1/search?q=${name}&key=${process.env.TENORKEY}&contentfilter=high`)
    const index = Math.floor(Math.random() * res.data.results.length); //randomizes the gif
    return res.data.results[index.toString()].media['0'].gif.url;

}

async function getShow(name) {
    const res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${name}`);
    //checking for null values
    var genres = res.data.genres;
    if (genres.length == 0){
        genres = 'N/A';
    }
    var rating = res.data.rating.average;
    if (rating === null){
        rating = 'N/A';
    }
    var dateStart = res.data.premiered;
    if (dateStart === null){
        dateStart = 'N/A';
    }
    var dateEnd = res.data.ended;
    if (dateEnd === null){
        dateEnd = 'N/A';
    }
    var summary = res.data.summary;
    if (summary === null){
        summary = 'Summary Not Available';
    }
    else{
        summary = summary.match(/<p>(.*?)<\/p>/g).map(function(val) { //removes the <p></p> tags
            return val.replace(/<\/?p>/g, '');
        });
    }
    var thumbnail = res.data.image;
    if (thumbnail === null){
        thumbnail = 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png'
    }
    else{
        thumbnail = res.data.image.medium;
    }
    const info = new MessageEmbed()
        .setColor(`#bee2e7`)
        .setAuthor('Show Information')
        .setTitle(`${res.data.name}`)
        .setURL(`${res.data.url}`)
        .setDescription(`**Language:** ${res.data.language}
            **Genres:** ${genres}
            **Rated:** ${rating}
            **Released:** ${dateStart} to ${dateEnd}
            **Summary:** ${summary}
            `)
        .setThumbnail(`${thumbnail}`)
        .setTimestamp()
    return {
        embeds: [info]
    };
}
```

## Issues Encountered + Solution
* Getting ```TypeError('CLIENT_MISSING_INTENTS');``` errors
    * Turns out I was not using the latest discord.js and node version while I was building my bot and using the wrong syntax to create a new client
    * [stackoverflow](https://stackoverflow.com/questions/68701446/discord-api-valid-intents-must-be-provided-for-the-client)
* Discord embeds not showing up
    * I was using the older syntax for embeds
    * [stackoverflow](https://stackoverflow.com/questions/63095161/discord-js-referenceerror-embed-is-not-defined) 
* Not being able to retrieve gif url from Tenor gif api
    * JSON: keys required string as the index and I did not log high enough in the chain of objects
    * The working code: ```res.data.results['0'].media['0'].gif.url```
* Problem deploying bot on Heroku
    * 1. Add ```"start": "node index.js"``` in the scripts section of package.json
    * 2. Update the node version on Heroku by adding code below to package.json
    ```"engines":{
             "node":"16.3"
        }
    ```
    * 3. Create a Procfile with the following: ```worker: npm start```
    * 4. Change from Web to Worker on Heroku under "Resources"
    <img width="1115" alt="Screen Shot 2021-12-15 at 10 20 52 PM" src="https://user-images.githubusercontent.com/44072717/146302996-7677df76-2bd4-45cf-9870-74906fb3f54b.png">
    * 5. Upload the Config Tokens on Heruku under "Settings"
    * <img width="599" alt="Screen Shot 2021-12-15 at 10 21 03 PM" src="https://user-images.githubusercontent.com/44072717/146303064-efc5ba25-c8ee-44d7-9c43-1a0c16939a7d.png">
    * 6. *Click on manual deploy if needed*
     
## Final Result


## Resources
Resources used in the coding process
* [bot setup](https://buddy.works/tutorials/how-to-build-a-discord-bot-in-node-js-for-beginners)
* [implementing axios](https://www.youtube.com/watch?v=fQqkaQSc8dI)
