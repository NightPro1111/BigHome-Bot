const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('removebg')
        .setDescription('Tách/Xoá Background của ảnh')
        .addAttachmentOption(option => option.setName('image').setDescription('Ảnh mà bạn muốn RemoveBG xoá').setRequired(true))
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.deferReply({ ephemeral: true});

        const image = interaction.options.getAttachment('image');

        const reponse = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'vo4JsNzTmD2CaBmQJDDF7A3y',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                image_url: image.proxyURL,
                size: 'auto',
            })
        });

        const arrayBuffer = await reponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const attachment = new AttachmentBuilder(buffer, { name: 'removebg.png'});

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`💎 Tách/Xoá Background ảnh của bạn`)
        .setImage('attachment://removebg.png')

        await interaction.editReply({ embeds: [embed], files: [attachment], ephemeral: true});
    }
};