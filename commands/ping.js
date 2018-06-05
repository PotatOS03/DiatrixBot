const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let ping = 0;
    setInterval(function() {
        ping++;
    }, 1);

    message.channel.send("Pong!").then(msg => msg.edit(`Pong! Your latency is: \`${ping} ms\``));
}

module.exports.help = {
    name: "ping",
    desc: "View your latency",
    group: "Information"
}