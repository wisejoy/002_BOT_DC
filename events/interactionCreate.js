module.exports = {
  name: 'interactionCreate',
  once: false,
  emitter: 'client',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      const errorMsg = { content: '❌ Terjadi kesalahan saat menjalankan command ini.', ephemeral: true };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMsg);
      } else {
        await interaction.reply(errorMsg);
      }
    }
  },
};
