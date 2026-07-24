module.exports = {
  name: 'error',
  once: false,
  emitter: 'distube',
  execute(error, queue, song) {
    console.error('DisTube error:', error);
    queue?.textChannel
      ?.send(`❌ Terjadi error: ${error?.message || 'tidak diketahui'}`)
      .catch(() => {});
  },
};
