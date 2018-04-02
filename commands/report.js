const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.mentions.members.first();
    if (!rUser) return message.channel.send("Couldn't find user.");
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
    if (!reportsChannel) return message.channel.send("Couldn't find reports channel.");

    message.delete().catch(O_o=>{});
    reportsChannel.send(reportEmbed);
}

module.exports.help = {
    name: "report",
    desc: "Report a user",
    usage: " [user] [reason]"
}