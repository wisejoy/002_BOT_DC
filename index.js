require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ---- Load semua slash command dari folder /commands ----
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

// ---- Setup DisTube (mesin pemutar musik) ----
const spotifyPlugin =
  process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET
    ? new SpotifyPlugin({
      api: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      },
    })
    : new SpotifyPlugin(); // tetap bisa parsing link tanpa API key (fallback)

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [spotifyPlugin, new SoundCloudPlugin(), new YtDlpPlugin()],
  ffmpeg: {
    path: require('ffmpeg-static'),
  },
});
client.distube.on('debug', (message) => console.log('[DisTube Debug]', message));
client.distube.on('ffmpegDebug', (message) => console.log('[FFmpeg Debug]', message));

// ---- Load event handler DisTube & Discord dari folder /events ----
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((f) => f.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    (event.emitter === 'distube' ? client.distube : client).once(event.name, (...args) =>
      event.execute(...args, client)
    );
  } else {
    (event.emitter === 'distube' ? client.distube : client).on(event.name, (...args) =>
      event.execute(...args, client)
    );
  }
}

client.login(process.env.DISCORD_TOKEN);
