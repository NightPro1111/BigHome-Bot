const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping của bot'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {[]} args 
     */
    options: {
        cooldown: 5000
    },
    run: async (client, interaction, args) => {

        const embed = new EmbedBuilder()
        .setTitle(`\`${client.user.username}'s Ping\``)
        .setDescription(`\`\`\`ini\n[ ${client.ws.ping}ms ]\n\`\`\``)
        .setColor('Random')
        .setFooter({ text: "© Developer: Little | Little's Bot"})
        .setTimestamp()
        
        await interaction.reply({
            embeds: [embed]
        });
    }
};
