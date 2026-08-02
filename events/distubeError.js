module.exports = {
  name: 'error',
  once: false,
  emitter: 'distube',
  execute(error, queue, song) {
    console.error('DisTube error:', error?.stack || error);
    console.error('DisTube error context -> song:', song?.url, '| errorCode:', error?.errorCode);
    queue?.textChannel
      ?.send(`❌ Terjadi error: ${error?.message || 'tidak diketahui'}`)
      .catch(() => { });
  },
};