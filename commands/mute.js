const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Rendre un membre muet temporairement.')
        .addUserOption(option => 
            option.setName('utilisateur')
                .setDescription('Utilisateur à rendre muet')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Durée du mute en minutes')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: '❌ Tu n’as pas la permission de mute des membres.', ephemeral: true });
        }

        const utilisateur = interaction.options.getUser('utilisateur');
        const minutes = interaction.options.getInteger('minutes');

        const membre = await interaction.guild.members.fetch(utilisateur.id).catch(() => null);
        if (!membre) return interaction.reply({ content: '❌ Impossible de trouver cet utilisateur.', ephemeral: true });

        await membre.timeout(minutes * 60 * 1000, 'Mute temporaire');
        await interaction.reply(`✅ ${utilisateur.tag} a été mute pour ${minutes} minutes.`);
    },
};
