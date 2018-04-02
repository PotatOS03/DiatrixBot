const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    if (!coins[message.author.id]) {
        return message.reply("you don't have any coins!");
    }

    let pUser = message.mentions.members.first();

    if (!coins[pUser.id]) {
        coins[pUser.id] = {
            coins: 0
        };
    }

    let pCoins = coins[pUser.id].coins;
    let sCoins = coins[message.author.id].coins;

    if (sCoins < args[1]) return message.reply("you don't have enough coins!");

    coins[message.author.id] = {
        coins: sCoins - parseInt(args[1])
    };

    coins[pUser.id] = {
        coins: pCoins + parseInt(args[1])
    };

    message.channel.send(`${message.author} has given ${args[1]} coins to ${pUser}`);

    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err);
    });
}

module.exports.help = {
    name: "pay",
    desc: "Pay a user in coins",
    usage: " [user] [amount]"
}