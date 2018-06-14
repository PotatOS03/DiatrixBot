const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let users = require("../users.json");
    
    if (!args[0]) {
        return message.reply(`you have ${users[message.author.id].warnings} warnings.`);
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "Manage Messages");

    let wUser = message.mentions.members.first();
    if (!wUser) return errors.usage(message, "warnlevel", "Couldn't find user");
    if (!users[wUser.id]) users[wUser.id] = {
        coins: 0,
        warnings: 0,
        xp: 0,
        level: 1
    };

    let warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> has ${users[wUser.id].warnings} warnings.`);
}

module.exports.help = {
    name: "warnlevel",
    desc: "Check how many warnings a user has",
    group: "Moderation",
    usage: " (user)",
    perms: "Manage Messages"
}