const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulser un membre du serveur.')
        .addUserOption(option => 
            option.setName('utilisateur')
                .setDescription('Utilisateur à expulser')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison de l’expulsion')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: '❌ Tu n’as pas la permission d’expulser des membres.', ephemeral: true });
        }

        const utilisateur = interaction.options.getUser('utilisateur');
        const raison = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        const membre = await interaction.guild.members.fetch(utilisateur.id).catch(() => null);
        if (!membre) return interaction.reply({ content: '❌ Impossible de trouver cet utilisateur.', ephemeral: true });

        await membre.kick(raison);
        await interaction.reply(`✅ ${utilisateur.tag} a été expulsé pour : ${raison}`);
    },
};
