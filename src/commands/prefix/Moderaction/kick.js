const { Message, PermissionFlagBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'kick',
        description: 'Đuổi ai đó ra khỏi máy chủ',
        aliases: [],
        permissions: PermissionsBitField.Flags.KickMembers
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" " || x.user.username === args[0]));

        if (!member) return message.channel.send("Hãy chọn 1 người để kick");
        if (message.member === member) return message.channel.send("Bạn không thể kick chính mình");
        if (!member.kickable) return message.channel.send("Không thể kick người này")

        let reason = args.slice(1).join(" ") || "Không có lý do";

        const embed = new EmbedBuilder()
        .setDescription(`:white_check_mark: Thành công đá đít ${member} với lý do ${reason}`)
        .setColor(0x5fb041)
        .setTimestamp()

        member.kick().catch(err => {
            message.channel.send("Đã có lỗi");
            console.log(err)
        })

        message.channel.send({ embeds: [embed]});
    }
};