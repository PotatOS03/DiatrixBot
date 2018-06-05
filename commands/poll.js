const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "Manage Server");
    
    let pollTime = args[0];
    
    let pollInfo = args.slice(0).join(" ").split("\"");
    let pollMessage = pollInfo[1];
    let pollOptions = pollInfo.slice(2).filter((element, index) => index % 2);
    
    if (!pollMessage) return errors.usage(message, "level", "Specify a message");

    let emojiOptions = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹"];
    let emojiOptionsReact = ["🇹", "🇸", "🇷", "🇶", "🇵", "🇴", "🇳", "🇲", "🇱", "🇰", "🇯", "🇮", "🇭", "🇬", "🇫", "🇪", "🇩", "🇨", "🇧", "🇦"];

    let reactionOptions = "";
    for (var i = 0; i < pollOptions.length; i++) {
        reactionOptions += `${emojiOptions[i]} | ${pollOptions[i]}\n`;
    }
    
    message.delete().catch();
    
    let pollEmbed = new Discord.RichEmbed()
    .setTitle("New Poll")
    .setDescription(pollMessage)
    .setColor("f04747")
    .addField("React to this message to vote!", reactionOptions)
    if (ms(pollTime)) pollEmbed.setFooter(`This poll will be completed after ${pollTime}`);
    
    message.channel.send(pollEmbed)
    .then(m => {
        function AcceptsArrayOfReactions(arr) {
            if (arr.length <= emojiOptions.length - pollOptions.length) return;
            m.react(arr.pop())
            .then(() => AcceptsArrayOfReactions(arr));
        }
        AcceptsArrayOfReactions(emojiOptionsReact)

        if (!args[0] || !ms(pollTime)) return;
        
        setTimeout(function(){
            let pollResults = new Discord.RichEmbed()
            .setTitle("Poll Completed!")
            .setDescription(pollMessage)
            .setTimestamp(message.createdAt)
            .setColor("f04747")
            for (var i = 0; i < pollOptions.length; i++) {
                let votes = m.reactions.get(emojiOptions[i]).count - 1;
                if (votes > 0) pollResults.addField(pollOptions[i], `Votes: ${votes}`, true)
            }

            m.delete();
            
            message.channel.send(pollResults);
        }, ms(pollTime));
    });
}

module.exports.help = {
    name: "poll",
    desc: "Create a poll for users to vote on",
    group: "Server",
    usage: " [time] [message] [options]",
    perms: "Manage Server",
    info: "Group the message and each option inside quotes\nUsers must react to the poll message before the time runs out"
}