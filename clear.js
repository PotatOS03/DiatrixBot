const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the permissions.");
    if (!args[0]) return message.channel.send("Specify a number of messages.");
    message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(3000));
    });
}

module.exports.help = {
    name: "clear",
    desc: "Clear a number of messages",
    usage: " [number of messages]"
}