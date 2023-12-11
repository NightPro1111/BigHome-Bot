const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Lấy thông tin của ai đó')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user')
                .setRequired(false)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || interaction.user;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            await interaction.reply({
                content: 'Người này không có trong máy chủ của bạn'
            });

            return;
        };

        const roles = [];
        
        if (member.roles) member.roles.cache.forEach((role) => {
            if (role.id !== interaction.guild.roles.everyone.id) roles.push(`${role.toString()}`);
        });

        const arr = [
            `**Tên người dùng**: ${user.username}`,
            `**Tên hiển thị**: ${member.nickname || user.displayName}`,
            `**ID**: ${user.id}`,
            `**Vào Discord**: ${time(user.createdTimestamp, 'd')} (${time(user.createdTimestamp, 'R')})`,
            `**Vào server**: ${time(member.joinedTimestamp, 'd')} (${time(member.joinedTimestamp, 'R')})`,
            `**Roles** [${member.roles?.cache?.size - 1}]: ${roles.join(', ')}`,
            `**Trong Voice Channel?**: ${member.voice ? 'Đúng' : 'Sai'}`,
            `**Owner Server?**: ${interaction.guild.ownerId === user.id ? 'Đúng' : 'Sai'}`,
            `**Timed out?**: ${member.communicationDisabledUntilTimestamp ? 'Đúng' : 'Sai'}`,
        ];

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Thông tin của - ' + user.username)
                    .setThumbnail(member.displayAvatarURL())
                    .setDescription(`${arr.join('\n')}`)
                    .setColor('Blurple')
            ]
        });

    }
};