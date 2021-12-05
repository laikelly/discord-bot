require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios
// const client = new Discord.Client(); //create new client
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

client.on('message', async msg => {
    switch (msg.content) {
        case "!help":
            const des = new MessageEmbed()
                .setColor(`#bee2e7`)
                .setDescription(`Below are the list of commands and functionalities:
                    !info - to retrieve Actor/Actress personal information`)
                .setTitle(`AI - Bot`)
            msg.channel.send({
                embeds: [des]
            });
            break
        case "!info":
            const name = new MessageEmbed()
                .setColor(`#bee2e7`)
                .setDescription(`Please enter the name of the Actor / Actress you would like to search with their name separated by a "+" sign (Ex: dilraba+dilmurat)`)
                .setTitle(`AI - Bot`)
            msg.channel.send({
                embeds: [name]
            }).then(function(message) {
                let filter = (msg) => !msg.author.bot;
                let options = {
                    max: 1
                }
                let collector = msg.channel.createMessageCollector(filter, options)
                collector.on('collect', async (msg) => {
                    console.log(`Collected ${msg.content}`);
                    collector.stop();
                    const info = await getInfo(`${msg.content}`);
                    msg.channel.send(info);

                });

                collector.on('end', (collected) => {
                    console.log(`Collected ${collected.size} items`);
                });
            });
            break
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
client.login(process.env.TOKEN); //login bot using token
