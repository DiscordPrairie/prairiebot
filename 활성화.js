const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ0OTA4MjkzODU1NjQxNzEz.XzqD6A.hVa5TVYcRfURhXzSqTT9pUuKpbU';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);