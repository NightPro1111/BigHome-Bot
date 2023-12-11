const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const puppeteer = require('puppeteer')

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('chat-gpt')
        .setDescription('Hỏi Chat GPT')
        .addStringOption(option => option.setName('prompt').setDescription('Câu hỏi').setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        
        await interaction.reply({ content: `🧠 Đang tải phản hồi của bạn ... việc này có thể mất chút thời gian`, ephemeral: true});

        const {options} = interaction;
        const prompt = options.getString('prompt');

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://chat-app-f2d296.zapier.app/');

        const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
        await page.waitForSelector(textBoxSelector);
        await page.type(textBoxSelector, prompt);

        await page.keyboard.press('Enter');

        await page.waitForSelector('[data-testid="final-bot-response"] p');

        var value = await page.$$eval('[data-testid="final-bot-response"]', async (elements) => {
            return elements.map((element) => element.textContent);
        });

        setTimeout(async () => {
            if (value.length == 0) return await interaction.editReply({ content: `Có một số lỗi khi nhận câu hỏi của bạn, thử lại sau ít phút nữa!`});
            
        }, 30000);

        await browser.close();

        value.shift();
        const embed = new EmbedBuilder()
        .setColor('Random')
        .setDescription(`\`\`\`${value.join(`\n\n\n\n`)}\`\`\``);

        await interaction.editReply({ content: '', embeds: [embed]});
    }
};
