const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    if (!message.member.hasPermission("MANAGE_GUILD") || !args[0]) {
        let pEmbed = new Discord.RichEmbed()
        .setColor("f04747")
        .addField(`${message.guild.name} prefix`, prefixes[message.guild.id].prefixes)
        if (message.member.hasPermission("MANAGE_GUILD")) pEmbed.setFooter(`Type ${prefixes[message.guild.id].prefixes}prefix [desired prefix] to change the server's prefix`);

        return message.channel.send(pEmbed);
    }

    prefixes[message.guild.id] = {
        prefixes: args[0]
    }

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed);
}

module.exports.help = {
    name: "prefix",
    desc: "Change the prefix for commands",
    usage: " (desired prefix)",
    perms: "Manage Server"
}