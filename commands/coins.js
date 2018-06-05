const Discord = require("discord.js");
const errors = require("../utilities/errors.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    let cUser = message.mentions.members.first();
    if (!args[0]) cUser = message.member;
    else if (!cUser) return errors.usage(message, "coins", "Couldn't find user");

    if (!coins[cUser.id]) {
        coins[cUser.id] = {
            coins: 0
        };
    }

    let uCoins = coins[cUser.id].coins;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(cUser.user.username)
    .setColor("f04747")
    .addField("Coins", uCoins);

    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
}

module.exports.dm = async (bot, message, args) => {
    let cUser = message.author;
    if (!coins[cUser.id]) {
        coins[cUser.id] = {
            coins: 0
        };
    }

    let uCoins = coins[cUser.id].coins;

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