module.exports = {
  name: 'clientReady',
  once: true,
  emitter: 'client',
  execute(client) {
    console.log(`✅ Bot online sebagai ${client.user.tag}`);
    client.user.setActivity('/help untuk lihat command(pilih chiesa babu)', { type: 2 });
  },
};
