const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Atur volume pemutaran (0-100)')
    .addIntegerOption((option) =>
      option.setName('level').setDescription('Level volume 0-100').setRequired(true).setMinValue(0).setMaxValue(100)
    ),

  async execute(interaction, client) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: '❌ Tidak ada lagu yang sedang diputar.', ephemeral: true });
    }

    const level = interaction.options.getInteger('level');
    queue.setVolume(level);
    await interaction.reply(`🔊 Volume diatur ke **${level}%**`);
  },
};
