const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Atur mode pengulangan lagu')
    .addStringOption((option) =>
      option
        .setName('mode')
        .setDescription('Pilih mode loop')
        .setRequired(true)
        .addChoices(
          { name: 'Matikan', value: 'off' },
          { name: 'Ulang 1 lagu', value: 'song' },
          { name: 'Ulang seluruh antrian', value: 'queue' }
        )
    ),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    const mode = interaction.options.getString('mode');
    const modeMap = { off: 0, song: 1, queue: 2 };
    const modeLabel = { off: '⏹️ Loop dimatikan', song: '🔂 Mengulang 1 lagu', queue: '🔁 Mengulang seluruh antrian' };

    queue.setRepeatMode(modeMap[mode]);

    const embed = new EmbedBuilder().setColor('#1DB954').setDescription(modeLabel[mode]);

    await interaction.reply({ embeds: [embed] });
  },
};
