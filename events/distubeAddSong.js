const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'addSong',
  once: false,
  emitter: 'distube',
  execute(queue, song) {
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setDescription(`✅ **${song.name}** ditambahkan ke antrian - \`${song.formattedDuration}\``);
    queue.textChannel?.send({ embeds: [embed] });
  },
};
