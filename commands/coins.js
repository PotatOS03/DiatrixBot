const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    if (!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0
        };
    }

    let uCoins = coins[message.author.id].coins;

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("f04747")
    .addField("Coins", uCoins);

    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
}

module.exports.help = {
    name: "coins",
    desc: "Check how many coins you have",
    usage: ""
}