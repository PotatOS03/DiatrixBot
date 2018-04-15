const Discord = require("discord.js");
const errors = require("../utilities/errors.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    try {
        let {body} = await superagent
        .get(`aws.random.cat/meow`);

        let catEmbed = new Discord.RichEmbed()
        .setColor("f04747")
        .setTitle("Random Cat")
        .setImage(body.file);

        message.channel.send(catEmbed);
        console.log(body);
    } catch(e) {
        errors.other(message, "Please try again");
    }
}

module.exports.help = {
    name: "cat",
    desc: "Generate a random cat photo or gif"
}