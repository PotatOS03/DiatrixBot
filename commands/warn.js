const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utilities/errors.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let wUser = message.mentions.members.first();
    if (!wUser) return message.channel.send("Couldn't find user.");
    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be warned.");
    let reason = args.slice(1).join(" ");

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("f04747")
    .addField("Warned User", `<@${wUser.user.id}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnChannel = message.guild.channels.find(`name`, "incidents");
    if (!warnChannel) return message.channel.send("Couldn't find incidents channel.");

    message.delete().catch();
    warnChannel.send(warnEmbed);

    if (warns[wUser.id].warns === 3) {
        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) return message.channel.send("Create a Muted role");

        let mutetime = "10s";
        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.user.id}> has been temporarily muted.`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.user.id}> has been unmuted.`);
        }, ms(mutetime))
    }
    if (warns[wUser.id].warns === 5) {
        message.guild.member(wUser).ban(reason);
        message.channel.send(`<@${wUser.user.id}> has been banned.`);
    }
}

module.exports.help = {
    name: "warn",
    desc: "Warn a user",
    usage: " [user] [reason]"
}