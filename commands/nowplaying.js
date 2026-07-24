const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('nowplaying').setDescription('Lihat lagu yang sedang diputar'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    const song = queue.songs[0];
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle('🎧 Sedang Diputar')
      .setDescription(`**${song.name}**`)
      .addFields(
        { name: 'Durasi', value: song.formattedDuration, inline: true },
        { name: 'Diminta oleh', value: `${song.user}`, inline: true },
        { name: 'Volume', value: `${queue.volume}%`, inline: true }
      )
      .setThumbnail(song.thumbnail || null)
      .setURL(song.url);

    await interaction.reply({ embeds: [embed] });
  },
};
