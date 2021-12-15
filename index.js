require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios

const {MessageEmbed} = require('discord.js');
const {Client,Intents} = require('discord.js'); //create discord client
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () => {
    console.info(`The client is ready!`);
});

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

client.login(process.env.TOKEN); //login bot using token
