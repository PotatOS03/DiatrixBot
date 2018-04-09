const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../utilities/errors.js");
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");

    if (!args[0] || args[0] === "help") return message.channel.send("Usage: `" + `${prefixes[message.guild.id].prefixes}prefix [desired prefix here]` + "`");

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
    usage: " (desired prefix)"
}