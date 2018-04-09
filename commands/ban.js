const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    let bUser = message.mentions.members.first();
    let bReason = args.slice(1).join(" ");
    if (!bUser) return message.channel.send("Couldn't find user.");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("f04747")
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentChannel = message.guild.channels.find(`name`, "incidents");
    if (!incidentChannel) return message.channel.send("Couldn't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    message.delete().catch();
    incidentChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    desc: "Ban a user",
    usage: " [user] [reason]"
}