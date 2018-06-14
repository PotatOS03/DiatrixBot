const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let users = require("../users.json");
    if (users[message.author.id].coins <= 0) return errors.other(message, "You don't have any coins")

    let pUser = message.mentions.members.first();

    if (!pUser) return errors.usage(message, "pay", "Couldn't find user");
    if (pUser === message.member) return errors.other(message, "You can't pay yourself");

    if (!users[pUser.id]) {
        users[pUser.id] = {
            coins: 0,
            warnings: 0,
            xp: 0,
            level: 1
        };
    }

    if (!parseInt(args[1]) || args[1] <= 0) return errors.usage(message, "pay", "Specify a valid amount to pay");

    if (users[message.author.id].coins < args[1]) return errors.other(message, `You don't have enough coins! You need ${parseInt(args[1]) - users[message.author.id].coins} more coins.`);

    users[message.author.id].coins -= parseInt(args[1]);

    users[pUser.id].coins += parseInt(args[1]);

    message.channel.send(`${message.author} has given ${args[1]} coins to ${pUser}`);

    fs.writeFileSync("./users.json", JSON.stringify(users));
}

module.exports.help = {
    name: "pay",
    desc: "Pay a user in coins",
    group: "Users",
    usage: " [user] [amount]"
}