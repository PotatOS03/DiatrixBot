const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "Manage Server");
    
    let pollTime = args[0];
    if (!args[0] || !ms(pollTime)) return errors.usage(message, "poll", "Specify a time");
    
    let pollMessage = args.slice(1).join(" ");
    if (!pollMessage) return errors.usage(message, "level", "Specify a message");
    
    message.delete().catch();

    let pollEmbed = new Discord.RichEmbed()
    .setTitle("New Poll")
    .setColor("f04747")
    .addField(pollMessage, "React to this message with 👍 or 👎 to vote!")
    .setFooter(`This poll will be completed after ${pollTime}`);

    message.channel.send(pollEmbed)
    .then(m => {
        m.react("👍")
        m.react("👎")
        setTimeout(function(){
            let pollResults = new Discord.RichEmbed()
            .setTitle("Poll Completed!")
            .setDescription(pollMessage)
            .setTimestamp(message.createdAt)
            .setColor("f04747")
            .addField("Upvotes", m.reactions.get("👍").count - 1, true)
            .addField("Downvotes", m.reactions.get("👎").count - 1, true);

            m.delete();
            
            message.channel.send(pollResults);
        }, ms(pollTime));
    });
}

module.exports.help = {
    name: "poll",
    desc: "Create a poll for users to vote on",
    usage: " [time] [message]",
    perms: "Manage Server",
    info: "Users must react to the poll message before the time runs out"
}