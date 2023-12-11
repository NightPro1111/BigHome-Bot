const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const Discord = require("discord.js");
const moment = require("moment");
let cpuStat = require("cpu-stat");
require("moment-duration-format");
const os = require("os");

module.exports = {
  structure: new SlashCommandBuilder()
  .setName('status')
  .setDescription("Hiển thị thông số của bot!"),

  /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

  run: async (client, interaction) => {

    const uptime = moment
      .duration(interaction.client.uptime)
      .format(" D [ngày], H [giờ], m [phút], s [giây]");
    let channelCount = client.channels.cache.size;
    let serverCount = client.guilds.cache.size;
    let memberCount = 0;
    client.guilds.cache.forEach((guild) => {
      memberCount += guild.memberCount;
    });

    cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
  }

  const statusEmbed = new EmbedBuilder()
      .setTitle(`\`🔎 Số liệu thống kê của ${client.user.username}\``)
      .setColor('#03f8fc')
      .setFields([
        {
          name: "**`💻 Máy chủ`**",
          value: `\`\`\`css\n[ ${serverCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`📁 Kênh`**",
          value: `\`\`\`css\n[ ${channelCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`👪 Thành Viên`**",
          value: `\`\`\`css\n[ ${memberCount} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`⌚️ Thời Gian Hoạt Động`**",
          value: `\`\`\`css\n[ ${uptime} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`👾 Discord.js`**",
          value: `\`\`\`css\n[ ${Discord.version} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`🔰 NodeJS`**",
          value: `\`\`\`css\n[ ${process.version} ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`🏓 Ping`**",
          value: `\`\`\`css\n[ ${client.ws.ping} ms ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`⏳ RAM`**",
          value: `\`\`\`css\n[ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`🤖 CPU Đang Dùng`**",
          value: `\`\`\`css\n[ ${percent.toFixed(2)} % ]\n\`\`\``,
          inline: true,
        },
        {
          name: "**`🤖 CPU`**",
          value: `\`\`\`css\n[ ${os.cpus().map((i) => `${i.model}`)[0]} ]\n\`\`\``,
          inline: true,
        },
      ])
      .setFooter({ text: "© Developer: Little | Little's Bot"})
      .setTimestamp();
    interaction.reply({ embeds: [statusEmbed] });
  })
  },
};