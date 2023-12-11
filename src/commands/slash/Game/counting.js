const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const counting = require('../../../schemas/CountingSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('counting')
        .setDescription('Minigame đếm số')
        .addSubcommand(command => command.setName('setup').setDescription('Setup Minigame').addChannelOption(option => option.setName('channel').setDescription("Channel mà bạn muốn setup").addChannelTypes(ChannelType.GuildText).setRequired(true)))
        .addSubcommand(command => command.setName('disable').setDescription('Disable Minigame')),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options } = interaction;
        const sub = options.getSubcommand()
        const data = await counting.findOne({ Guild: interaction.guild.id});

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Bạn không có quyền để sử dụng lệnh này!`, ephemeral: true});

        switch (sub) {
            case 'setup':

            if (data) {
                return await interaction.reply({ content: `Bạn đã setup Minigame này ở đây`, ephemeral: true});
            } else {
                const channel = interaction.options.getChannel('channel');
                await counting.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                    Number: 1
                });

                const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`⏰ Minigame đã được khởi chạy! Vui lòng đến ${channel} và hãy bắt đầu với số 1!`)

                await interaction.reply({ embeds: [embed], ephemeral: true});
            }
            
            break;
            case 'disable':

            if (!data) {
                return await interaction.reply({ content: `Bạn không có một Minigame Đếm Số được khởi tạo!`, ephemeral: true})
            } else {
                await counting.deleteOne({
                    Guild: interaction.guild.id,
                });

                const embed = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`👉 Minigame Đếm Số đã được tắt ở server!`)

                await interaction.reply({ embeds: [embed], ephemeral: true});
            }
        }
    }
};