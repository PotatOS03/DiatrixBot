const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    let dogEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .setTitle("Random Dog")
    .setImage(body.url);

    message.channel.send(dogEmbed);
}

module.exports.help = {
    name: "dog",
    desc: "Generate a random dog photo or gif",
    usage: ""
}