require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios
// const client = new Discord.Client(); //create new client
const {MessageEmbed} = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    switch (msg.content) {
        case "hi":
            msg.reply("Welcome!");
            break;
        // case "!meme":
        //     msg.channel.send("Here's your meme!");
        //     const img = await getMeme();
        //     msg.channel.send(img);
        //     break
        case "!dlrb":
            // const embed = new MessageEmbed()
            // .setColor(`#bee2e7`)
            // .setTitle(`Actor Info`)
            // msg.channel.send({embeds: [embed]});
            // msg.channel.send("Here's a image of the actor")
            const info = await getInfo('diliraba');
            msg.channel.send(info);
            break
    }
});
// async function getMeme(){
//     const res = await axios.get(`https://memeapi.pythonanywhere.com/`);
//     return res.data.memes[0].url;
// }

async function getInfo(name){
    const res = await axios.get(`https://api.tvmaze.com/search/people?q=${name}`);
    const embed = new MessageEmbed()
    .setColor(`#bee2e7`)
    .setAuthor('Actor/Actress Personal Information')
    .setTitle(`${res.data[0].person.name}`)
    .setURL(`${res.data[0].person.url}`)
    .setDescription(`Gender: ${res.data[0].person.gender}
        Birthday: ${res.data[0].person.birthday}
        Born in: ${res.data[0].person.country.name}`)
    .setThumbnail(`${res.data[0].person.image.medium}`)
    .setTimestamp()
    return {embeds: [embed]}; //image
}
client.login(process.env.TOKEN); //login bot using token
