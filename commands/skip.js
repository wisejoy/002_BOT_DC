const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Lewati lagu yang sedang diputar'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    try {
      const song = queue.songs.length > 1 ? queue.songs[1] : null;
      await queue.skip();
      await interaction.reply(
        song ? `⏭️ Melewati lagu, sekarang memutar **${song.name}**` : '⏭️ Lagu dilewati.'
      );
    } catch (err) {
      await interaction.reply({ content: `❌ ${err.message || 'Tidak ada lagu berikutnya.'}`, ephemeral: true });
    }
  },
};
