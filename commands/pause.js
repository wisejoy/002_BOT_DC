const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('pause').setDescription('Jeda lagu yang sedang diputar'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    if (queue.paused) {
      return interaction.reply({ content: '⚠️ Lagu sudah dalam keadaan dijeda.', ephemeral: true });
    }

    queue.pause();
    await interaction.reply('⏸️ Lagu dijeda.');
  },
};
