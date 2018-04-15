const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let coins = require("../coins.json");

    if (!coins[message.author.id]) {
        return errors.other(message, "You don't have any coins!");
    }

    let pUser = message.mentions.members.first();

    if (!pUser) return errors.usage(message, "pay", "Couldn't find user")

    if (!coins[pUser.id]) {
        coins[pUser.id] = {
            coins: 0
        };
    }

    let pCoins = coins[pUser.id].coins;
    let sCoins = coins[message.author.id].coins;

    if (!parseInt(args[1]) || args[1] <= 0) return errors.usage(message, "pay", "Specify a valid amount to pay");

    if (sCoins < args[1]) return errors.other(message, `You don't have enough coins! You need ${parseInt(args[1]) - sCoins} more coins.`);

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