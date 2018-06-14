const Discord = require("discord.js");
const botconfig = require("../botconfig");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let lUser = message.mentions.members.first();
    if (!args[0]) lUser = message.member;
    else if (!lUser) return errors.usage(message, "level", `Couldn't find user: ${args[0]}`);

    let users = require("../users.json");

    if (!users[lUser.id]) users[lUser.id] = {
        coins: 0,
        warnings: 0,
        xp: 0,
        level: 1
    }

    let nextLvlXP = Math.floor(Math.pow(users[lUser.id].level, 1.5) * 300);
    let difference = nextLvlXP - users[lUser.id].xp;
    
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(lUser.user.username, lUser.displayAvatarURL)
    .setColor("f04747")
    .addField("Level", users[lUser.id].level, true)
    .addField("XP", users[lUser.id].xp, true)
    .setFooter(`${difference} XP until next level up`);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
}

module.exports.dm = async (bot, message, args) => {
    lUser = message.author;

    let nextLvlXP = Math.floor(Math.pow(users[lUser.id].level, 1.5) * 300);
    let difference = nextLvlXP - users[lUser.id].xp;
    
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(lUser.username, lUser.displayAvatarURL)
    .setColor("f04747")
    .addField("Level", users[lUser.id].level, true)
    .addField("XP", users[lUser.id].xp, true)
    .setFooter(`${difference} XP until next level up`);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "level",
    desc: "Check what level a user is at",
    group: "Users",
    usage: " (user)",
    dm: true
}