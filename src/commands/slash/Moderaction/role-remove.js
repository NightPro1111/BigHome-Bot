const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('role-remove')
    .setDescription('Remove Role nào đó cho ai')
    .addRoleOption(role => role.setName('role').setDescription("Role mà bạn muốn remove").setRequired(true))
    .addUserOption(option => option.setName('user').setDescription("Người mà bạn muốn remove role").setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options } = interaction;

        const role = options.getRole("role");
        const user = interaction.options.getMember('user');
        const member = await interaction.guild.members.fetch(user.id)
        
        if (member.roles.cache.has(role.id)) {
            const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`<a:no:1157935620488970321> ${user} không có role ${role}`)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true}),
            })
            .setFooter({ text: `Thực hiện bởi: ${interaction.user.tag}`})
            .setTimestamp()
            await interaction.reply({ embeds: [embed], ephemeral: true})
            return;
        }
        try {
            await interaction.guild.members.cache.get(user.id).roles.add(role)
            const embed2 = new EmbedBuilder()
            .setColor(role.color)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true}),
            })
            .setDescription(`<a:yes:1157935616764424252> Thành công remove role ${role} của ${user}`)
            .setFooter({ text: `Thực hiện bởi: ${interaction.user.tag}`})
            .setTimestamp()

            await interaction.reply({ embeds: [embed2], ephemeral: true})
        } catch (error) {
            console.log(error)
            const embed3 = new EmbedBuilder()
            .setColor(role.color)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true}),
            })
            .setFooter({ text: `Thực hiện bởi: ${interaction.user.tag}`})
            .setTimestamp()
            .setDescription(`<a:no:1157935620488970321> Đã thất bại khi remove role \`${role}\` của ${user.tag}`)

            await interaction.reply({ embeds: [embed3], ephemeral: true})
        }
    }
};