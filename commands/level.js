const Discord = require("discord.js");
const botconfig = require("../botconfig");
const errors = require("../utilities/errors.js");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    let lUser = message.mentions.members.first();
    if (!args[0]) lUser = message.member;
    else if (!lUser) return errors.usage(message, "level", `Couldn't find user: ${args[0]}`);

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

module.exports.dm = async (bot, message, args) => {
    let lUser = message.mentions.members.first();
    if (!args[0]) lUser = message.member;
    else if (!lUser) return errors.usage(message, "level", `Couldn't find user: ${args[0]}`);

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
    name: "level",
    desc: "Check what level a user is at",
    group: "Users",
    usage: " (user)",
    dm: true
}