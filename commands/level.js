const Discord = require("discord.js");
const botconfig = require("../botconfig");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    let lUser = message.mentions.members.first();
    if (!args[0]) lUser = message.member;
    else if (!lUser) return message.channel.send("Specify a valid user.");

    if (!xp[lUser.id]) {
        xp[lUser.id] = {
            xp: 0,
            level: 1
        }
    }
    let nextLvlXP = Math.floor(Math.pow(xp[lUser.id].level, 1.5) * 300);
    let difference = nextLvlXP - xp[lUser.id].xp;
    
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(lUser.user.username)
    .setColor("f04747")
    .addField("Level", xp[lUser.id].level, true)
    .addField("XP", xp[lUser.id].xp, true)
    .setFooter(`${difference} XP until next level up`, lUser.displayAvatarURL);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "level2",
    desc: "Check what level a user is at",
    usage: " (user)"
}