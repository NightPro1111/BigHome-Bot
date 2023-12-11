const { Message, PermissionFlagBits, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'say',
        description: 'Muốn bot nói cái gì',
        aliases: [],
        permissions: PermissionsBitField.Flags.ManageMessages
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const m = args.join(' ')
        if (message.deletable) message.delete()
        message.channel.send(m)
    }
};