const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('country')
        .setDescription('Xem thông tin của 1 quốc gia')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Tên quốc gia mà bạn muốn xem thông tin')
                .setRequired(true))
        .setDMPermission(true),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ fetchReply: true });
        const country = interaction.options.getString('name');

        try {
            const response = await axios(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
            const data = response.data[0];

            const countryEmbed = new EmbedBuilder()
                .setTitle(`${data.name.common}`)
                .setThumbnail(`${data.flags.png}`)
                .addFields(
                    { name: `Tên Chính Thức`, value: `${data.name.official}`, inline: true },
                    { name: `Lục Địa`, value: `${data.continents.join(', ') || 'N/A'}`, inline: true },
                    { name: `Thủ Đô`, value: `${data.capital.join(', ') || 'N/A'}`, inline: true },
                    { name: `Châu Lục`, value: `${data.region || 'N/A'}`, inline: true },
                    { name: `Tổng Số Dân`, value: `${data.population.toLocaleString() || 'N/A'}`, inline: true },
                    { name: `Diện Tích`, value: `${data.area.toLocaleString() || 'N/A'}`, inline: true },
                    { name: `Ngôn Ngữ Chính`, value: `${Object.values(data.languages)?.join(', ') || 'N/A'}`, inline: true },
                    { name: `Tiền Tệ`, value: `${Object.values(data.currencies).map(currency => `${currency.name} (${currency.symbol})`)?.join(', ') || 'N/A'}`, inline: true },
                    { name: `Múi Giờ`, value: `${Object.values(data.timezones)?.join(', ') || 'N/A'}`, inline: true },
                    { name: `Đặc Điểm Quốc Kì`, value: `${data.flags.alt || 'N/A'}`, inline: true },
                )
                .setColor('Random')
                .setTimestamp()
                .setFooter({
                    text: `${data.name.common}`,
                    iconURL: `${data.flags.png}`
                })
                await interaction.editReply({ embeds: [countryEmbed]});
            } catch (error) { // If Any Errors
                await interaction.editReply({ content: `Đã gặp lỗi khi lấy dữ liệu từ API, hãy thử lại sau`, ephemeral: true })
                await wait(6000)
                await interaction.deleteReply()
                console.log(error)
            }
        }
    };
