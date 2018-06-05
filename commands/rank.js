const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let ranks = require("../ranks.json");
    if (!ranks[message.guild.id] || ranks[message.guild.id].length <= 0) return errors.other(message, "This server doesn't have any ranks");

    if (!args[0]) return errors.usage(message, "rank", "Specify a rank name");

    let rankName = args.slice(0).join(" ").toLowerCase();
    let rank = -1;

    for (var i = 0; i < ranks[message.guild.id].length; i++) {
        if (message.guild.roles.find("id", ranks[message.guild.id][i]).name.toLowerCase() === rankName) rank = i;
    }

    if (rank === -1) return errors.usage(message, "rank", `Couldn't find rank: ${rankName}`);

    let rankRole = message.guild.roles.find("id", ranks[message.guild.id][rank]);

    if (!message.member.roles.has(rankRole.id)) {
        message.member.addRole(rankRole.id);

        let rEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("f04747")
        .addField("Rank Joined", rankRole.name);

        return message.channel.send(rEmbed);
    }

    message.member.removeRole(rankRole.id);

    let rEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("f04747")
    .addField("Rank Left", rankRole.name);

    message.channel.send(rEmbed);
}

module.exports.help = {
    name: "rank",
    desc: "Join a server rank",
    group: "Server",
    usage: " [name]",
    info: "Automatically be given the corresponding role"
}