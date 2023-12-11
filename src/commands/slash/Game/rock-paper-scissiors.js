const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('rock-paper-scissiors')
        .setDescription('Chơi Đấm Lá Kéo')
        .addUserOption(option => option.setName('user').setDescription("Người mà bạn muốn chơi").setRequired(true))
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options } = interaction;
        const opponent = options.getUser('user');

        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'Đấm Lá Kéo',
              color: '#5865F2',
              description: 'Chọn các nút bên dưới để thể hiện sự lựa chọn của bạn'
            },
            buttons: {
              rock: 'Đấm',
              paper: 'Lá',
              scissors: 'Kéo'
            },
            emojis: {
              rock: '🌑',
              paper: '🍃',
              scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'Bạn chọn {emoji}.',
            winMessage: '**{player}** thắng! Chúc mừng!',
            tieMessage: 'Hoà! Không ai thắng trong game này cả!',
            timeoutMessage: 'Trò chơi chưa hoàn thành! Không ai thắng Trò chơi!',
            playerOnlyMessage: 'Chỉ {player} và {opponent} có thể dùng nút'
          });
          
          Game.startGame();
    }
};