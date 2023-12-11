const {
    ApplicationCommandOptionType,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require('discord.js');
  const { REPLICATE_API_KEY } = require('../../../../config.json');
  const models = require('../../../models');
  const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
  const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Tạo ảnh theo yêu cầu bằng AI')
        .addStringOption(option => option
                .setName('prompt')
                .setDescription('Yêu cầu về ảnh | Vui lòng nhập bằng Tiếng Anh (Eng) không nhập Tiếng Việt (VIE)')
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName('model')
                .setDescription('Model')
                .setRequired(false)
            )
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        try {
            await interaction.deferReply();
      
            const { default: Replicate } = await import('replicate');
      
            const replicate = new Replicate({
              auth: REPLICATE_API_KEY,
            });
      
            const prompt = interaction.options.getString('prompt');
            const model = interaction.options.getString('model') || models[0].value;
      
            const output = await replicate.run(model, { input: { prompt } });
      
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setLabel(`Download`)
                .setStyle(ButtonStyle.Link)
                .setURL(`${output[0]}`)
                .setEmoji('1101133529607327764')
            );
      
            const resultEmbed = new EmbedBuilder()
              .setTitle('Ảnh đã được tạo ra')
              .addFields({ name: 'Prompt', value: prompt })
              .setImage(output[0])
              .setColor('#44a3e3')
              .setFooter({
                text: `Phản hồi ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              });
      
            await interaction.editReply({
              embeds: [resultEmbed],
              components: [row],
            });
          } catch (error) {
            const errEmbed = new EmbedBuilder()
              .setTitle('Đã gặp lỗi')
              .setDescription('```' + error + '```')
              .setColor(0xe32424);
      
            interaction.editReply({ embeds: [errEmbed]});
          }
        },
    }

