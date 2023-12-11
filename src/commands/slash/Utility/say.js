const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Muốn bot nói cái gì')
        .addStringOption((option) => option.setName('message').setDescription("Tin nhắn mà bạn muốn bot nói").setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const text = interaction.options.getString('message');
        const channel = interaction.channel;

        interaction.reply({ content: `:white_check_mark: Đã gửi tin nhắn **Thành Công**!`, ephemeral: true});
        channel.send({ content: `${text}`});
    }
};
