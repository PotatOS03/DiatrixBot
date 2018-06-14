// Set up the bot and Discord library
const Discord = require("discord.js");

// If the user doesn't have the required permissions
module.exports.noPerms = (message, perm) => {
    message.delete().catch();
    
    let permEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("NO PERMISSIONS")
    .setColor("f04747")
    .addField("Message Sent", message.content)
    .addField("Insufficient Permission", perm);

    message.channel.send(permEmbed).then(m => m.delete(10000));
}

// If the bot doesn't have the required permissions and therefore can't execute the command
module.exports.botPerms = (message, perm) => {
    message.delete().catch();
    
    let permEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Bot doesn't have permissions")
    .setColor("f04747")
    .addField("Message Sent", message.content)
    .addField("Insufficient Permission", perm);

    message.channel.send(permEmbed).then(m => m.delete(10000));
}

// If the user incorrectly used the command
module.exports.usage = (message, command, info) => {
    message.delete().catch();

    let servers = require("../servers.json");
    let botconfig = require("../botconfig.json");

    // Find help info about the command used
    let cmdHelp = require(`../commands/${command}.js`).help;

    let usageEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("INCORRECT USAGE")
    .setColor("f04747")
    .addField("Message Sent", message.content)
    if (message.channel.type === "text") usageEmbed.addField("Usage", "`" + `${servers[message.guild.id].prefix}${cmdHelp.name}${cmdHelp.usage}` + "`", true)
    if (message.channel.type === "dm") usageEmbed.addField("Usage", "`" + `${botconfig.prefix}${cmdHelp.name}${cmdHelp.usage}` + "`", true)
    usageEmbed.addField("Info", info, true);

    message.channel.send(usageEmbed).then(msg => msg.delete(60000));
}

// Other error
module.exports.other = (message, info) => {
    message.delete().catch();

    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("ERROR")
    .setColor("f04747")
    .addField("Message Sent", message.content)
    .addField("Info", info);

    message.channel.send(embed).then(msg => msg.delete(30000));
}