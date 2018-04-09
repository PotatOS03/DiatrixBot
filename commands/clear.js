const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if (!args[0]) return message.channel.send("Specify a number of messages.");
    /*if (!args[0]) return message.channel.send("Specify type of messages.");
    if (args[0] !== "all" && args[0] !== "contains" && args[0] !== "equals" && args[0] !== "author") return message.channel.send("Invalid type of messages.");
    if (!args[1]) return message.channel.send("Specify a number of messages.");
    if (args[0] === "all") {*/
        message.channel.bulkDelete(parseInt(args[0])).then(() => {
            message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(3000));
        });
        return;
    /*}
    let requirement = args.slice(2).join(" ");
    let cleared = 0;

    message.delete().catch();
    message.channel.fetchMessages({limit: Math.min(args[1] + 1, 100)})
    .then(messages => messages.forEach((m, i) => {
        if (args[0] === "contains") {
            if (m.content.split(requirement).length > 1) {
                m.delete();
                cleared++;
            }
        }
        if (args[0] === "equals") {
            if (m.content === requirement) {
                m.delete();
                cleared++;
            }
        }
        if (args[0] === "author") {
            if (m.author === requirement) {
                m.delete();
                cleared++;
            }
        }
    }))*/
}

module.exports.help = {
    name: "clear",
    desc: "Clear messages",
    usage: " [number of messages]"
    //usage: " [all/contains/equals/author] [number of messages] (text/author)"
}