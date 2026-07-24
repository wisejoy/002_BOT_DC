const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lihat daftar semua command bot musik ini'),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle('🎵 Daftar Command Bot Musik')
      .setDescription('Berikut semua command yang bisa kamu pakai:')
      .addFields(
        { name: '/play `<lagu/link>`', value: 'Putar lagu dari YouTube, Spotify, atau SoundCloud. Bot otomatis join voice channel kamu.' },
        { name: '/skip', value: 'Lewati lagu yang sedang diputar.' },
        { name: '/pause', value: 'Jeda lagu yang sedang diputar.' },
        { name: '/resume', value: 'Lanjutkan lagu yang dijeda.' },
        { name: '/stop', value: 'Stop musik dan kosongkan antrian.' },
        { name: '/queue', value: 'Lihat daftar antrian lagu.' },
        { name: '/loop `<mode>`', value: 'Ulang 1 lagu, seluruh antrian, atau matikan loop.' },
        { name: '/volume `<0-100>`', value: 'Atur volume pemutaran.' },
        { name: '/nowplaying', value: 'Lihat info lagu yang sedang diputar.' },
        { name: '/help', value: 'Tampilkan pesan ini.' }
      )
      .setFooter({ text: `Diminta oleh ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
