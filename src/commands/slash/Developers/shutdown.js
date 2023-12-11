const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, embedLength } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Tạm dừng Bot | Chỉ Developer mới được dùng'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (interaction.user.id != '1011242519218094121') return;
        else {
            
            const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`🛠 Bot đã được tạm dừng!`)
            .setTimestamp()

            await interaction.reply({ content: `<a:Search:1119154609798262876> Đang tạm dừng ${client.user.username} ...`, ephemeral: true});
            client.user.setStatus('invisible');

            setTimeout(async () => {
                await interaction.editReply({ content: '', embeds: [embed], ephemeral: true});
                process.exit();
            }, 2000);
        }
    }
};