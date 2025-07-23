const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du serveur.')
        .addUserOption(option => 
            option.setName('utilisateur')
                .setDescription('Utilisateur à bannir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison du bannissement')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: '❌ Tu n’as pas la permission de bannir des membres.', ephemeral: true });
        }

        const utilisateur = interaction.options.getUser('utilisateur');
        const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        const membre = await interaction.guild.members.fetch(utilisateur.id).catch(() => null);
        if (!membre) return interaction.reply({ content: '❌ Impossible de trouver cet utilisateur.', ephemeral: true });

        await membre.ban({ reason: raison });
        await interaction.reply(`✅ ${utilisateur.tag} a été banni pour : ${raison}`);
    },
};
