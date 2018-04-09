const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    
    let pollTime = args[0];
    if (!ms(pollTime)) return message.channel.send("Specify a time.");
    
    let pollMessage = args.slice(1).join(" ");
    if (!pollMessage) return message.channel.send("Specify a message.");
    
    message.delete().catch();
    
    let pollChannel = message.guild.channels.find(`name`, "announcements");

    let pollEmbed = new Discord.RichEmbed()
    .setTitle("New Poll")
    .setColor("f04747")
    .addField(pollMessage, "React to this message with 👍 or 👎 to vote!")
    .setFooter(`This poll will be completed after ${pollTime}`);

    pollChannel.send(pollEmbed)
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
            
            pollChannel.send(pollResults);
        }, ms(pollTime));
    });
}

module.exports.help = {
    name: "poll",
    desc: "Create a poll for users to vote on",
    usage: " [time] [message]"
}