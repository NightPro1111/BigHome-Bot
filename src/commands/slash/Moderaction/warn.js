const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Để cảnh cáo ai đó')
        .addUserOption(option => option.setName('user').setDescription("Người dùng bạn muốn cảnh báo").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Lý do").setRequired(false)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You do not have permissons to use this command", ephemeral: false});

        const member = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');

        if (!reason) reason = "Không có lý do";

        const embed = new EmbedBuilder()
        .setColor('#00c7fe')
        .setDescription(`<a:yes:1157935616764424252> Thành công **Cảnh cáo** ${member} | Lý do: ${reason}`);

        const dmSend = new EmbedBuilder()
        .setColor('#00c7fe')
        .setDescription(` Bạn đã bị **Cảnh cáo** trong ${interaction.guild.name} | Lý do: ${reason}`);

        await interaction.reply({ embeds: [embed], ephemeral: true})

        await member.send({ embeds: [dmSend]}).catch(err => {
            return;
        })
    }
};
