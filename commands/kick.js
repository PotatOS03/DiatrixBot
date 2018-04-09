const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    let kUser = message.mentions.members.first();
    if (!kUser) return message.channel.send("Couldn't find user.");
    let kReason = args.slice(1).join(" ");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("f04747")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if (!kickChannel) return message.channel.send("Couldn't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    message.delete().catch();
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick",
    desc: "Kick a user",
    usage: " [user] [reason]"
}