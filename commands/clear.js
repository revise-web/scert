const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Effacer un certain nombre de messages.')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de messages à effacer')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '❌ Tu n’as pas la permission de supprimer des messages.', ephemeral: true });
        }

        const nombre = interaction.options.getInteger('nombre');
        if (nombre < 1 || nombre > 100) {
            return interaction.reply({ content: '❌ Le nombre de messages doit être entre 1 et 100.', ephemeral: true });
        }

        await interaction.channel.bulkDelete(nombre, true);
        await interaction.reply({ content: `✅ ${nombre} messages ont été supprimés.`, ephemeral: true });
    },
};
