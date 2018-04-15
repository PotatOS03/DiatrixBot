const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "Manage Messages");

    if (!parseInt(args[0])) return errors.usage(message, "clear", "Specify a number of messages.");

    let limitLeft = parseInt(args[0]) + 1;
    let cleared = 0;

    if (!args[1]) {
        message.delete().catch();

        while (limitLeft > 0) {
            let messages = await message.channel.fetchMessages({limit: Math.min(limitLeft, 100)});
    
            limitLeft -= messages.size;
            cleared += messages.size;
            if (messages.size === 0) limitLeft = 0;
            await message.channel.bulkDelete(messages);
        }
        return message.channel.send(`Cleared ${cleared - 1} messages.`).then(msg => msg.delete(3000));
    }

    if (args[1] !== "contains" && args[1] !== "equals" && args[1] !== "author" && args[1] !== "bots") return errors.usage(message, "clear", "Invalid type of messages.");

    let requirement = args.slice(2).join(" ");
    if (args[1] !== "bots") {
        if (!requirement) return errors.usage(message, "clear", "Specify a requirement");
    }

    message.delete().catch();
    
    while (limitLeft > 0) {
        let messages = await message.channel.fetchMessages({limit: Math.min(limitLeft, 100)});
        if (args[1] === "equals") {
            messages = messages.filter(message => message.content === requirement);
        }
        if (args[1] === "contains") {
            messages = messages.filter(message => message.content.indexOf(requirement) >= 0);
        }
        if (args[1] === "author") {
            messages = messages.filter(m => `<@${m.author.id}>` === requirement || m.author.username === requirement);
        }
        if (args[1] === "bots") {
            messages = messages.filter(m => m.author.bot);
        }

        limitLeft -= messages.size;
        cleared += messages.size;
        if (messages.size === 0) limitLeft = 0;
        await message.channel.bulkDelete(messages);
    }
    message.channel.send(`Cleared ${cleared} messages.`).then(msg => msg.delete(3000));
}

module.exports.help = {
    name: "clear",
    desc: "Clear messages",
    usage: " [number of messages] (equals/contains/author/bots) (text/author)",
    perms: "Manage Messages",
    info: "Equals: Clears messages that match text\nContains: Clears messages containing text\nAuthor: Clears messages sent by a certain user\nBots: Clears messages sent by bots"
}