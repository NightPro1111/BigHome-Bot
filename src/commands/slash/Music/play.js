const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const player = require('../../../utils/player');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Mở nhạc trong Voice')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Nhập Link hoặc Tên Bài Hát để tìm')
                .setRequired(true)
        ),

    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options, member, guild, channel } = interaction;

        const query = options.getString('query');
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: 'Bạn phải ở trong 1 kênh', ephemeral: true });
        }

        if (!member.voice.channel == guild.members.me.voice.channel) {
            return interaction.reply({
                content: `Hãy vào <#${guild.members.me.voice.channelId}>`,
                ephemeral: true
            });
        }

        try {
            await interaction.reply({ content: 'Đã thêm vào danh sách', ephemeral: true });
            await player.play(voiceChannel, query, { textChannel: channel, member });
        } catch (error) {
            await interaction.reply({ content: 'Đã có lỗi', ephemeral: true });
            console.error(error);
        }
    },
}
