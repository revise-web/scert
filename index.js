require('dotenv').config();
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
    
    // 🔧 Personnalisation du statut et de la description ici
    client.user.setPresence({
        activities: [{ name: 'XEN | /help', type: ActivityType.Watching }], // Activité du bot
        status: 'dnd' // Statut du bot: 'online', 'idle', 'dnd' (Do Not Disturb), 'invisible'
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Erreur lors de l’exécution de la commande.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Le bot est en ligne !');
});

app.listen(3000, () => {
    console.log('🚀 Serveur keep-alive démarré !');
});
