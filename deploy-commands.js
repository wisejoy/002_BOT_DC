require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Mendaftarkan ${commands.length} slash command...`);

    if (process.env.GUILD_ID) {
      // Registrasi ke 1 server saja -> muncul instan, cocok untuk testing
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log('Berhasil! Command terdaftar di guild (server) tersebut.');
    } else {
      // Registrasi global -> muncul di semua server, tapi bisa perlu ~1 jam propagasi
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
      console.log('Berhasil! Command terdaftar secara global.');
    }
  } catch (error) {
    console.error(error);
  }
})();
