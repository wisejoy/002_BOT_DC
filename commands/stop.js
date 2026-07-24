const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stop musik dan kosongkan antrian'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    queue.stop();
    await interaction.reply('⏹️ Musik dihentikan dan antrian dikosongkan.');
  },
};
