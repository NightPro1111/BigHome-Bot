const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { memcmp } = require('libsodium-wrappers');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Lấy Avatar của ai đó')
        .addUserOption(option => option.setName('avatar').setDescription('Người muốn lấy avatar').setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const {options} = interaction;

        const user = options.getUser('avatar');
        const imageURL = user.displayAvatarURL({ format: 'png', size: 4096, dymatic: true});

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`Avatar của ${user.username}`)
        .setImage(imageURL)
        .setTimestamp();

        const button = new ButtonBuilder()
        .setLabel(`Avatar Link`)
        .setStyle(ButtonStyle.Link)
        .setURL(`${user.avatarURL({size: 4096})}`);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ embeds: [embed], components: [row] });

    }
};
