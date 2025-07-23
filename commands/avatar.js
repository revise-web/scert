const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Affiche l\'avatar d\'un utilisateur')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur dont vous voulez voir l\'avatar')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        await interaction.reply({
            embeds: [{
                title: `Avatar de ${user.username}`,
                image: { url: avatarURL },
                color: 0x3498db
            }]
        });
    },
};
