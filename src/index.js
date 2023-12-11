require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
const { Events, Client, GatewayIntentBits, ChannelType, EmbedBuilder } = require('discord.js');

const client = new ExtendedClient();

module.exports = client;

client.start();

// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

//Counting
const counting = require('./schemas/CountingSchema')
client.on(Events.MessageCreate, async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const data = await counting.findOne({ Guild: message.guild.id});
    if (!data) return;
    else {

        if (message.channel.id !== data.Channel) return;

        const number = Number(message.content);

        if (number !== data.Number) {
            return message.react(`<a:no:1157935620488970321>`);
        } else if (data.LastUser === message.author.id) {
            message.react(`<a:no:1157935620488970321>`);
            await message.reply(`<a:no:1157935620488970321> Ai đó đã đếm số này (có thể là bạn điếm 2 lần liên tiếp)!`);
        } else {
            await message.react(`<a:yes:1157935616764424252>`);

            data.LastUser = message.author.id;
            data.Number++;
            await data.save();
        }
    }
})

