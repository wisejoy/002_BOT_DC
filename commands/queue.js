const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('queue').setDescription('Lihat daftar antrian lagu'),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada antrian lagu saat ini.', ephemeral: true });
    }

    const list = queue.songs
      .slice(0, 10)
      .map((song, i) => `${i === 0 ? '▶️' : `${i}.`} **${song.name}** - \`${song.formattedDuration}\``)
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle('🎶 Antrian Lagu')
      .setDescription(list)
      .setFooter({
        text:
          queue.songs.length > 10
            ? `Dan ${queue.songs.length - 10} lagu lainnya...`
            : `Total ${queue.songs.length} lagu`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};
