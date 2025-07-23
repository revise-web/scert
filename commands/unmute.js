const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Rétablir la possibilité de parler pour un utilisateur.')
        .addUserOption(option => 
            option.setName('utilisateur')
                .setDescription('Utilisateur à unmute')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: '❌ Tu n’as pas la permission de lever le mute des membres.', ephemeral: true });
        }

        const utilisateur = interaction.options.getUser('utilisateur');
        const membre = await interaction.guild.members.fetch(utilisateur.id).catch(() => null);
        if (!membre) return interaction.reply({ content: '❌ Impossible de trouver cet utilisateur.', ephemeral: true });

        await membre.timeout(null, 'Unmute effectué');
        await interaction.reply(`✅ ${utilisateur.tag} a été unmuté.`);
    },
};
