const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription("Affiche les informations du serveur"),

    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setTitle(`📜 Infos du serveur ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '🆔 ID', value: guild.id, inline: true },
                { name: '👑 Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
                { name: '📅 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '👥 Nombre de membres', value: `${guild.memberCount}`, inline: true },
                { name: '📜 Nombre de rôles', value: `${guild.roles.cache.size}`, inline: true },
                { name: '🏆 Rôle le plus élevé', value: guild.roles.cache.filter(role => role.id !== guild.id).sort((a, b) => b.position - a.position).first()?.name || "Aucun rôle", inline: true },
                { name: '📖 Nombre de salons', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🚀 Nombre de boosts', value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
                { name: '💎 Niveau de boost', value: `Niveau ${guild.premiumTier}`, inline: true },
                { 
                    name: '🏆 Meilleur donateur', 
                    value: guild.members.cache
                        .filter(m => m.premiumSince) // Filtrer les membres ayant boosté
                        .sort((a, b) => b.premiumSinceTimestamp - a.premiumSinceTimestamp) // Trier par date de boost
                        .first()?.user.tag || "Aucun booster", 
                    inline: true 
                }

            )
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
