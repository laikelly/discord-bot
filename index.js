require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios

const {
    MessageEmbed
} = require('discord.js');
const {
    Client,
    Intents
} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (msg.content === "!help") {
        const des = new MessageEmbed()
            .setColor(`#bee2e7`)
            .setDescription(`Below are the list of commands and functionalities:
                        *Format: ![command] [name of Actor/Actress separated by spaces]*

                        **!info** - returns Actor/Actress personal information
                        **!gif** - returns a random gif of the Actor/Actress`)
            .setTitle(`AI - Bot`)
        msg.channel.send({embeds: [des]});
    }
    let tokens = msg.content.split(" ");
    if (tokens[0] === "!info") {
        let keywords = " ";
        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join("+");
            msg.channel.send(await getInfo(keywords));
        }

    } else if (tokens[0] === "!gif") {
        let keywords = " ";
        if (tokens.length > 1) {
            keywords = tokens.slice(1, tokens.length).join(" ");
            msg.channel.send(await getGif(keywords));
        }
    }
});

async function getInfo(name) {
    const res = await axios.get(`https://api.tvmaze.com/search/people?q=${name}`);
    const info = new MessageEmbed()
        .setColor(`#bee2e7`)
        .setAuthor('Actor/Actress Personal Information')
        .setTitle(`${res.data[0].person.name}`)
        .setURL(`${res.data[0].person.url}`)
        .setDescription(`Gender: ${res.data[0].person.gender}
        Birthday: ${res.data[0].person.birthday}
        Born in: ${res.data[0].person.country.name}`)
        .setThumbnail(`${res.data[0].person.image.medium}`)
        .setTimestamp()
    return {
        embeds: [info]
    };
}

async function getGif(name) {
    const response = await axios.get(`https://g.tenor.com/v1/search?q=${name}&key=${process.env.TENORKEY}&contentfilter=high`)
    const index = Math.floor(Math.random() * response.data.results.length); //randomizes the gif
    return response.data.results[index.toString()].media['0'].gif.url;

}
client.login(process.env.TOKEN); //login bot using token
