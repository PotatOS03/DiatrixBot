const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "Ban Members");
    let bUser = message.mentions.members.first();
    let bReason = args.slice(1).join(" ");
    if (!bUser) return errors.usage(message, "ban", "Couldn't find user");
    if (!bReason) return errors.usage(message, "ban", "Specify a reason");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return errors.other(messages, "That person can't be banned")

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("f04747")
    .addField("Banned User", bUser)
    .addField("Banned By", `<@${message.author.id}>`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentChannel = message.guild.channels.find(`name`, "incidents");
    if (!incidentChannel) return errors.other(message, "Couldn't find incidents channel")

    message.guild.member(bUser).ban(bReason);
    bUser.send(`You have been **banned** in ${message.guild.name} for reason: *${bReason}*\nMessage <@286664522083729409> if you think this is an error.`)
    message.delete().catch();
    incidentChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    desc: "Ban a user",
    usage: " [user] [reason]",
    perms: "Ban Members"
}