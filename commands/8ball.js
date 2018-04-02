const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Please ask a question!");
    let replies = ["Yes.", "No.", "Yeano", "Absolutely not.", "Almost certainly.", "I'm busy right now. Ask again later."];

    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");

    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("f04747")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballEmbed);
}

module.exports.help = {
    name: "8ball",
    desc: "Ask a question for the 8 ball",
    usage: " [question]"
}