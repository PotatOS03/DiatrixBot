const Discord = require("discord.js");
let coins = require("../coins.json");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let cUser = message.mentions.members.first();
    if (!args[0]) cUser = message.member;
    else if (!cUser) return message.channel.send("Specify a valid user.");

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

module.exports.help = {
    name: "coins",
    desc: "Check how many coins a user has",
    usage: " (user)"
}