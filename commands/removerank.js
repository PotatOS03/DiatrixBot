const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "Manage Roles");

    let rankName = args.slice(0).join(" ");
    if (!rankName) return errors.usage(message, "removerank", "No rank specified");

    let servers = require("../servers.json");

    let rank = -1;

    for (let i in servers[message.guild.id].ranks) {
        if (message.guild.roles.find("id", servers[message.guild.id].ranks[i]).name === rankName) rank = i;
    }
    if (rank === -1) return errors.usage(message, "removerank", `${rankName} is not a rank in this server`);

    servers[message.guild.id].ranks.splice(rank, 1);
    
    fs.writeFileSync("./servers.json", JSON.stringify(servers));

    message.channel.send("Rank: `" + rankName + "` successfully removed");
}

module.exports.help = {
    name: "removerank",
    desc: "Remove a rank",
    group: "Server",
    usage: " [name]",
    perms: "Manage Roles"
}