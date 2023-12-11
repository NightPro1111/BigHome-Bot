const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('role-all')
        .setDescription('Give role cho tất cả các thành viên')
        .addRoleOption(role => role.setName('role').setDescription("Role mà bạn muốn give").setRequired(true))
    ,
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const {options, guild} = interaction;

        const role = options.getRole("role");
        const member = await guild.members.fetch()

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Bạn không có quyền để sử dụng lệnh này`, ephemeral: true});
        else {
            
            await interaction.reply({ content: `<a:loading:1163773982399549462> Đang give role cho các thành viên..... Chờ 1 lúc nhé!`});

            let num = 0;
            setTimeout(() => (
                member.forEach(async m => {
                    m.roles.add(role).catch(err => {
                        return;
                    });
                    num++;

                    const embed = new EmbedBuilder()
                    .setColor('Random')
                    .setDescription(`<a:yes:1157935616764424252> ${num} thành viên đã có role ${role}`)

                    await interaction.editReply({ content: ``,embeds: [embed]});
                })
            ), 100)
        }
    }
};