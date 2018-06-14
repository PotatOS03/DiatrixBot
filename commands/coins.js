const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let cUser = message.mentions.members.first();
    if (!args[0]) cUser = message.member;
    else if (!cUser) return errors.usage(message, "coins", "Couldn't find user");

    if (!users[cUser.id]) {
        users[cUser.id] = {
            coins: 0,
            warnings: 0,
            xp: 0,
            level: 1
        };
    }

    let uCoins = users[cUser.id].coins;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(cUser.user.username)
    .setColor("f04747")
    .addField("Coins", uCoins);

    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
}

module.exports.dm = async (bot, message, args) => {
    let cUser = message.author;

    let uCoins = users[cUser.id].coins;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(cUser.username)
    .setColor("f04747")
    .addField("Coins", uCoins);

    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "coins",
    desc: "Check how many coins a user has",
    group: "Users",
    usage: " (user)",
    info: "Coins have a random chance of being given for every message you send",
    dm: true
}