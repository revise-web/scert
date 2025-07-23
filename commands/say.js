const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Fait parler le bot')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message que le bot doit envoyer')
                .setRequired(true)
        ),

    async execute(interaction) {
        const message = interaction.options.getString('message');

        await interaction.channel.send(message);
        await interaction.reply({ content: 'Message envoyé !', ephemeral: true });
    },
};
