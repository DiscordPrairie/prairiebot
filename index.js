const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "🎊안녕하세요🎊";
const byeChannelName = "😅안녕히계세요😅";
const welcomeChannelComment = "안녕하세요! 저희서버에 오신걸 환영합니다";
const byeChannelComment = "서버에서 퇴장하셨습니다, 안녕히가세요!";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == 'embed') {
    let img = 'https://cdn.discordapp.com/attachments/737596942720303146/744928958583406743/1_25.png';
    let embed = new Discord.RichEmbed()
      .setTitle('봇 탑재된 기능')
      .setURL('http://www.naver.com')
      .setAuthor('파이리', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('전체dm공지기능', '!전체공지(공지할것)')
      .addField('출입알림', '나가는지 들어오는건지 알려줍니다', true)
      .addField('자동역활지급', '서버들어온사람들 한테자동으로 권한를 줍니다', true)
      .addField('자리비움', '기능비움', true)
      .addField('기능피움', '\\n\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('파이리가 만들었습니다', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://cdn.discordapp.com/attachments/737596942720303146/744928958583406743/1_25.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 파이리 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`파이리 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);