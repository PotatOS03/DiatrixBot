const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let servers = require("../servers.json");
    if (servers[message.guild.id].ranks.length <= 0) return errors.other(message, "This server doesn't have any ranks");

    let rankMembers = [];

    let longestRankName = 0;

    for (var i = 0; i < servers[message.guild.id].ranks.length; i++) {
        if (message.guild.roles.find("id", servers[message.guild.id].ranks[i]).name.length > longestRankName) {
            longestRankName = message.guild.roles.find("id", servers[message.guild.id].ranks[i]).name.length;
        }
    }
    
    let ranksText = "";
    for (var i = 0; i < servers[message.guild.id].ranks.length; i++) {
        rankMembers.push(0);
        message.guild.members.forEach(m => {
            if (m.roles.has(servers[message.guild.id].ranks[i])) rankMembers[i]++;
        });

        ranksText += "`" + message.guild.roles.find("id", servers[message.guild.id].ranks[i]).name;
        for (var j = -3; j < longestRankName - message.guild.roles.find("id", servers[message.guild.id].ranks[i]).name.length; j++) {
            ranksText += " ";
        }
        ranksText += rankMembers[i] + " members`\n";
    }

    let ranksEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .addField(`${message.guild.name} Ranks`, ranksText)
    .setFooter(`Type "${servers[message.guild.id].prefix}rank [name]" to join or leave a rank`)

    message.channel.send(ranksEmbed);
}

module.exports.help = {
    name: "ranks",
    desc: "View all server ranks",
    group: "Server",
    info: "How many members are in each rank"
}