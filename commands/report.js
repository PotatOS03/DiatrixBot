const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.mentions.members.first();
    if (!rUser) return errors.usage(message, "report", "Couldn't find user");
    let reason = args.slice(1).join(" ");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("f04747")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportsChannel = message.guild.channels.find(`name`, "incidents");
    if (!reportsChannel) return errors.other(message, "Couldn't find incidents channel.");

    message.delete().catch();
    reportsChannel.send(reportEmbed);
}

module.exports.help = {
    name: "report",
    desc: "Report a user",
    group: "Moderation",
    usage: " [user] [reason]"
}