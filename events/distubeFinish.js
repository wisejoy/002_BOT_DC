module.exports = {
  name: 'finish',
  once: false,
  emitter: 'distube',
  execute(queue) {
    queue.textChannel?.send('🏁 Antrian selesai. Sampai jumpa lagi!');
  },
};
