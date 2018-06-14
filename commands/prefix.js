const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let servers = require("../servers.json");
    
    if (!message.member.hasPermission("MANAGE_GUILD") || !args[0]) {
        let pEmbed = new Discord.RichEmbed()
        .setColor("f04747")
        .addField(`${message.guild.name} prefix`, servers[message.guild.id].prefix)
        if (message.member.hasPermission("MANAGE_GUILD")) pEmbed.setFooter(`Type "${servers[message.guild.id].prefix}prefix [desired prefix]" to change the server's prefix`);

        return message.channel.send(pEmbed);
    }

    servers[message.guild.id].prefix = args[0];

    fs.writeFileSync("./servers.json", JSON.stringify(servers));

    let sEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "prefix",
    desc: "Change the prefix for commands",
    group: "Server",
    usage: " (desired prefix)",
    perms: "Manage Server"
}