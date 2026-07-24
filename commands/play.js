const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Putar lagu dari YouTube, Spotify, atau SoundCloud')
    .addStringOption((option) =>
      option
        .setName('lagu')
        .setDescription('Judul lagu atau link (YouTube/Spotify/SoundCloud)')
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const query = interaction.options.getString('lagu');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({
        content: '❌ Kamu harus join voice channel dulu sebelum memutar lagu.',
        ephemeral: true,
      });
    }

    const permissions = voiceChannel.permissionsFor(interaction.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return interaction.reply({
        content: '❌ Aku tidak punya izin untuk join/berbicara di voice channel itu.',
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      await client.distube.play(voiceChannel, query, {
        member: interaction.member,
        textChannel: interaction.channel,
      });

      const embed = new EmbedBuilder()
        .setColor('#1DB954')
        .setDescription(`🔎 Mencari dan menambahkan **${query}** ke antrian...`);

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply('❌ Gagal memutar lagu itu. Coba judul/link lain.');
    }
  },
};
