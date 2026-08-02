const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'playSong',
  once: false,
  emitter: 'distube',
  execute(queue, song) {
    console.log(
      `[DEBUG playSong] Queue ${queue.id} | source: ${song.source} | url: ${song.url} | isLive: ${song.isLive} | duration: ${song.duration}s`
    );
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setDescription(
        `🎵 Sedang memutar **${song.name}** - \`${song.formattedDuration}\`\nDiminta oleh: ${song.user}`
      );
    queue.textChannel?.send({ embeds: [embed] });
  },
};