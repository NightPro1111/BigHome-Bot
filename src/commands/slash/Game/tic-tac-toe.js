const { TicTacToe } = require('discord-gamecord');
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('tic-tac-toe')
        .setDescription('Chơi cờ Caro')
        .addUserOption(option => option.setName('user').setDescription("Người mà bạn muốn chơi").setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const { options } = interaction;
        const opponent = options.getUser('user');

        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
                title: 'Tic Tac Toe',
                color: '#575757',
                statusTitle: 'Status',
                overTitle: 'Game Over'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '￼',
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | its turn of player **{player}**',
            winMessage: '{emoji} | **{player} won this game**',
            tieMessage: 'The game tired! No one won this game',
            timeoutMessage: 'The game went unfinished! No one won this game',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons'
        });

        Game.startGame();
        Game.on('gameover', result => {
            return;
        })
    }
};