const { ChatInputCommandInteraction, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, embedLength } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const moment = require("moment");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Xem thông tin của bot'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const name = interaction.client.user.username;
        const icon = `${client.user.displayAvatarURL()}`;
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;

        let ping = `${Date.now() - interaction.createdTimestamp}ms.`;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/J3PA3P2Hmv'),

            new ButtonBuilder()
            .setLabel('Bot Invite')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1152614645371252806&permissions=8&scope=bot%20applications.commands'),

        )

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: name, iconURL: icon })
        .setThumbnail(`${icon}`)
        .setFooter({ text: "Bot ID: 1150012276103979008" })
        .addFields({ name: `Tổng Số Server`, value: `${client.guilds.cache.size}`, inline: true })
        .addFields({ name: `Tổng Số Member`, value: `${client.users.cache.size}`, inline: true })
        .addFields({ name: `Tín hiệu`, value: `${ping}`, inline: true })
        .addFields({ name: `Uptime`, value: `\`\`\`${uptime}\`\`\``})

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};