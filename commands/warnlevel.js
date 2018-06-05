const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utilities/errors.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        if (!warns[message.author.id]) warns[message.author.id] = {
            warns: 0
        };
    
        let warnlevel = warns[message.author.id].warns;
    
        return message.reply(`you have ${warnlevel} warnings.`);
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "Manage Messages");

    let wUser = message.mentions.members.first();
    if (!wUser) return errors.usage(message, "warnlevel", "Couldn't find user");
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    let warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
    name: "warnlevel",
    desc: "Check how many warnings a user has",
    group: "Moderation",
    usage: " (user)",
    perms: "Manage Messages"
}