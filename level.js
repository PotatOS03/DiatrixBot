const Discord = require("discord.js");
const botconfig = require("../botconfig");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        }
    }
    let nextLvlXP = Math.floor(Math.pow(xp[message.author.id].level, 1.5) * 300);
    let difference = nextLvlXP - xp[message.author.id].xp;
    
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("f04747")
    .addField("Level", xp[message.author.id].level, true)
    .addField("XP", xp[message.author.id].xp, true)
    .setFooter(`${difference} XP until level up`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "level",
    desc: "Check what level you are at",
    usage: ""
}