const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Affiche les informations du bot, comme un générique de film'),

    async execute(interaction) {
        const botInfoEmbed = {
            color: 0x0099ff,
            title: '🎬 **Générique de XEN Bot** 🎬',
            description: 'Voici les informations sur le bot, comme à la fin d\'un film.',
            fields: [
                {
                    name: 'Nom du bot',
                    value: 'XEN', // Nom du bot
                    inline: true
                },
                {
                    name: 'Créateur',
                    value: 'next_xen et myvoice.yt', // Créateurs du bot
                    inline: true
                },
                {
                    name: 'Version du bot',
                    value: 'v1.0.0', // Version (à ajuster si nécessaire)
                    inline: true
                },
                {
                    name: 'Technologies utilisées',
                    value: 'Node.js, Discord.js', // Technologies utilisées
                    inline: true
                },
                {
                    name: 'Serveurs',
                    value: `${interaction.client.guilds.cache.size} serveurs`, // Nombre de serveurs où le bot est présent
                    inline: true
                },
                {
                    name: 'Utilisateurs',
                    value: `${interaction.client.users.cache.size} utilisateurs`, // Nombre d'utilisateurs utilisant le bot
                    inline: true
                },
                {
                    name: 'Développé avec ❤️',
                    value: 'Par **next_xen et myvoice.yt**', // Message de footer
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Merci d\'utiliser XEN Bot !'
            }
        };

        await interaction.reply({ embeds: [botInfoEmbed] });
    },
};
