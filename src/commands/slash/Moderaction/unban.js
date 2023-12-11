const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Để unban ai đó ở server này')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => option.setName("userid").setDescription("ID của người muốn unban").setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const {channel, options} = interaction;
        
        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setColor(0x5fb041)
            .setDescription(`<a:yes:1157935616764424252> Thành công UNBAN <@${userId}> ở server`)
            .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true});
        } catch(err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
            .setDescription(`<a:no:1157935620488970321> Hãy nhập vào một ID Discord hợp lý!!!`)
            .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed], ephemeral: true});
        }
    }
};