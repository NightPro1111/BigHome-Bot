const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Đuổi ai đó ra khỏi máy chủ')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
                option.setName("user")
                .setDescription("Người dùng bạn muốn đá đít")
                .setRequired(true)
            )
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("Lý do")
            )
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const {channel, options} = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason");

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
        .setColor(0xc72c3b)
        .setDescription(`<a:no:1157935620488970321>Bạn không thể thực hiện trên ${user.username} vì họ có role cao hơn (hoặc bằng bạn)`)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true});

        await member.kick(reason);

        const embed = new EmbedBuilder()
        .setDescription(`<a:yes:1157935616764424252> Thành công đá đít ${user} với lý do ${reason}`)
        .setColor(0x5fb041)
        .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true});
    },
};