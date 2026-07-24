const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('resume').setDescription('Lanjutkan lagu yang dijeda'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    if (!queue.paused) {
      return interaction.reply({ content: '⚠️ Lagu sedang tidak dijeda.', ephemeral: true });
    }

    queue.resume();
    await interaction.reply('▶️ Lagu dilanjutkan.');
  },
};
