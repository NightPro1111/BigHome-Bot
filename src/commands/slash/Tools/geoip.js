const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require("axios");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('geoip')
        .setDescription('Check các thông tin qua IP')
        .addStringOption(option => option.setName('host').setDescription("Host và Ip cần check").setRequired(true))
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const host = interaction.options.getString("host")

        // good IP
        axios
          .get(`http://ip-api.com/json/${host}`)
          .then((response) => {
            const data = response.data;
            interaction.reply(
              "```" +
                `IP: ${data.query}\nQuốc gia: ${data.country}, ${data.countryCode}\nVùng: ${data.regionName}, ${data.region}\nThành phố: ${data.city}\nISP: ${data.isp}\nTổ chức: ${data.org}\nASN: ${data.as}` +
                "```"
            );
          })
          .catch((error) => {
            console.log(error);
            interaction.reply("Đã sảy ra lỗi!");
          });
      } 
    };
