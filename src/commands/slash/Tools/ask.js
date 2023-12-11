const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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',
    organization: 'org-oJrvRE8gpW9LxMmf8pXjSeGo',
});

const openai = new OpenAIApi(configuration);

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Hỏi ChatGPT')
        .addStringOption(option => option.setName('question').setDescription("Câu hỏi mà bạn muốn hỏi").setRequired(true))
        .setDMPermission(false)
        ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.deferReply();

        const question = interaction.options.getString("question");


        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                max_token: 2048,
                temperature: 0.5,
                prompt: question,
            })

            const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            await interaction.editReply({ embeds: [embed]})
        } catch(e) {
            console.log(e)
            return await interaction.editReply({ content:`Yêu cầu của bạn bị lỗi với Status Code **${e.response.status}**`, ephemeral: true});
        }
    }
};