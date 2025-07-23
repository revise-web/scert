const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste des commandes du bot'),

    async execute(interaction) {
        const helpEmbed = {
            color: 0x3498db,
            title: '📜 Liste des commandes',
            description: 'Voici toutes les commandes disponibles :',
            fields: [
                { name: '🔍 Utilitaires', value: '`/avatar`, `/serverinfo`, `/userinfo`, `/ping`, `/say`', inline: false },
                { name: '🛠️ Modération', value: '`/ban`, `/kick`, `/mute`, `/unmute`, `/clear`', inline: false },
                { name: '🎨 Fun & Personnalisation', value: '`/multicolor`', inline: false }
            ],
            footer: { text: 'XEN Bot - Besoin d\'aide ? Contacte un modérateur. 👨🏼‍💻Développé par @myvoice.yt' }
        };

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    },
};
