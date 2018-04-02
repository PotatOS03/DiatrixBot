const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`aws.random.cat/meow`);

    let catEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .setTitle("Random Cat")
    .setImage(body.file);

    message.channel.send(catEmbed);
}

module.exports.help = {
    name: "cat",
    desc: "Generate a random cat photo or gif",
    usage: ""
}