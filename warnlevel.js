const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions.");
    let wUser = message.mentions.members.first();
    if (!wUser) return message.channel.send("Couldn't find user.");
    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };
    let warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
    name: "warnlevel",
    desc: "Check how many warnings a user has",
    usage: " [user]"
}