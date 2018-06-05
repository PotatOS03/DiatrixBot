// Set up the bot and Discord library
const Discord = require("discord.js");
// Error file
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    // If no question is asked
    if (!args[0]) return errors.usage(message, "8ball", "Ask a question");

    // All possible replies
    let replies = ["Yes.", "No.", "Yeano", "Absolutely not.", "Almost certainly.", "I'm busy right now. Ask again later.", "You tell me.", "Yes, probably.", "Do you want me to be honest?"];

    // Chooses a random reply
    let result = Math.floor(Math.random() * replies.length);
    // Question asked by the user
    let question = args.slice(0).join(" ");

    // Rich embed for the 8ball
    let ballEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .addField(`${message.author.username} asked:`, question)
    .addField("Answer", replies[result]);

    message.channel.send(ballEmbed);
}

module.exports.help = {
    name: "8ball",
    desc: "Ask a question for the 8 ball",
    group: "Fun",
    usage: " [question]"
}