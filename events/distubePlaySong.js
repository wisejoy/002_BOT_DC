const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'playSong',
  once: false,
  emitter: 'distube',
  execute(queue, song) {
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setDescription(
        `🎵 Sedang memutar **${song.name}** - \`${song.formattedDuration}\`\nDiminta oleh: ${song.user}`
      );
    queue.textChannel?.send({ embeds: [embed] });
  },
};
