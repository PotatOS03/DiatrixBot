// Set up the bot and Discord library
const Discord = require("discord.js");
// Lets files be written to and saved
const fs = require("fs");
// Error file
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    // If the user doesn't have the right permissions, tell them
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "Manage Roles");

    let servers = require("../servers.json");

    let rName = args.slice(0).join(" ");
    if (!rName) return errors.usage(message, "addrank", "Specify a rank name");

    let rankRole = message.guild.roles.find("name", rName) || message.guild.roles.find("id", rName) || message.mentions.roles.first();
    if (!rankRole) {
        return errors.usage(message, "addrank", `${rName.name || rName} is not a role in this server`);
    }

    if (servers[message.guild.id].ranks.includes(rankRole.id)) return errors.usage(message, "addrank", "That role is already a rank in this server");
    
    servers[message.guild.id].ranks.push(rankRole.id);

    fs.writeFileSync("../servers.json", JSON.stringify(servers));

    let rankEmbed = new Discord.RichEmbed()
    .setTitle("Rank Added!")
    .setColor("f04747")
    .addField("Rank", rankRole.name)
    .setFooter(`To view all ranks, type "${servers[message.guild.id].prefix}ranks"`)

    message.channel.send(rankEmbed);
}

module.exports.help = {
    name: "addrank",
    desc: "Add a rank",
    group: "Server",
    usage: " [name]",
    perms: "Manage Roles",
    info: "Add a rank to the server. The rank must match the name of a role. Any user can join that rank and get the role."
}