const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const ExtendedClient = require("../../../class/ExtendedClient");
const axios = require("axios");

module.exports = {
  structure: new SlashCommandBuilder()
    .setName("url-shortener")
    .setDescription("Rút gọn 1 URL")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Link mà bạn muốn rút gọn (Link mẫu: https://www.example.com)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("alias").setDescription("Chọn Alias cho Link của bạn")
    ),
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const { options } = interaction;
    const link = options.getString("link");
    const alias = options.getString("alias") || "";

    const input = {
      method: 'POST',
      url: 'https://url-shortener23.p.rapidapi.com/shorten',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '28200783dcmsh5d373b3c123b2f6p134027jsn32228c088988',
        'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com'
      },
      data: {
        url: link,
        alias: alias,
      }
    };

    try {
      const output = await axios.request(input);

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(
          `🔗 Here is your shortened link for \`${link}\`: ${output.data.short_url}`
        );

      await interaction.reply({ embeds: [embed] });
    } catch (e) {
      if (e.statusCode === 400) {
        return await interaction.editReply({
          content: `⚠️ Alias \`${alias}\` đã được sử dụng, vui lòng chọn 1 alias khác nhé!`,
        });
      } else {
        return await interaction.editReply({
          content: `⚠️ Có một số lỗi khi rút gọn Link cho bạn! Hãy thử lại sau! ('Có thể là do link của bạn sai. Link mẫu: https://www.example.com')`,
        });
      }
    }
  },
};
