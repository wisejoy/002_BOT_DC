module.exports = {
  name: 'finish',
  once: false,
  emitter: 'distube',
  execute(queue) {
    console.log(
      `[DEBUG finish] Queue ${queue.id} selesai. currentTime terakhir: ${queue.currentTime}s`
    );
    queue.textChannel?.send('🏁 Antrian selesai. Sampai jumpa lagi!');
  },
};