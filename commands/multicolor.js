const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multicolor')
        .setDescription('Modifie la couleur d\'un rôle pour créer un effet multicolore')
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Le rôle à rendre multicolore')
                .setRequired(true)),

    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const colors = [
            '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C', '#2ECC71', '#3498DB', '#F39C12', 
            '#8E44AD', '#D35400', '#1F618D', '#D5DBDB', '#58D68D', '#FF6347', '#16A085', '#F0E68C', '#B9770E', '#2980B9',
            '#E67E22', '#C0392B', '#8E44AD', '#2E4053', '#1F618D', '#7D3C98', '#FF9F00', '#27AE60', '#1D8348', '#5D6D7E',
            '#EC7063', '#F5B041', '#D5DBDB', '#16A085', '#D35400'
        ]; // Liste des couleurs étendue

        if (!role.editable) {
            return interaction.reply("Je ne peux pas modifier ce rôle.");
        }

        // Change la couleur du rôle indéfiniment
        let i = 0;
        const interval = setInterval(async () => {
            try {
                await role.setColor(colors[i]);
                i = (i + 1) % colors.length; // Tourner dans le tableau de couleurs
            } catch (error) {
                console.error("Erreur lors du changement de couleur :", error);
                clearInterval(interval); // Stoppe l'intervalle en cas d'erreur
            }
        }, 3000); // Change la couleur toutes les 5 secondes (ajuste si tu veux une autre vitesse)

        interaction.reply(`Le rôle **${role.name}** est maintenant multicolore et changera de couleur indéfiniment ! 🎨`);

        // Empêche l'utilisateur de refaire la commande pendant l'effet
        role.client.once('messageCreate', (msg) => {
            if (msg.content === '!stopmulticolor') {
                clearInterval(interval);
                msg.reply(`L'effet multicolore sur le rôle **${role.name}** a été arrêté.`);
            }
        });
    },
};
