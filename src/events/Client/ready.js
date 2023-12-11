const { ActivityType } = require('discord.js');
const { log } = require("../../functions");
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {
        const activities = [
            { name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
            { name: `${client.channels.cache.size} Channels`, type: ActivityType.Playing },
            { name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
            { name: `Discord.js v14`, type: ActivityType.Competing },
            { name: `Developer: LittleDz`,url: 'https://www.twitch.tv/discord', type: ActivityType.Streaming},
        ];
        const status = [
            'online',
            'dnd',
            'idle'
        ];
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, 5000);
    
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, 30000);

        log('Logged in as: ' + client.user.tag, 'done');
        

    }
};