const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utilities/errors.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let autoMute = 3;
let autoBan = 5;

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "Manage Messages");

    let wUser = message.mentions.members.first();
    if (!wUser) return errors.usage(message, "warn", "Couldn't find user");
    if (wUser.hasPermission("MANAGE_MESSAGES")) return errors.other(message, "That person can't be warned.");

    let reason = args.slice(1).join(" ");

    if (!reason) return errors.usage(message, "warn", "Specify a reason");


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
    if (!warnChannel) return errors.other(message, "Couldn't find incidents channel.");

    message.delete().catch();
    warnChannel.send(warnEmbed);

    if (warns[wUser.id].warns === autoMute) {
        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#818386",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                })
            } catch(e) {
                console.log(e.stack);
            }
        }

        let mutetime = "5m";
        await(wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.user.id}> has been temporarily muted.`);

        setTimeout(function(){
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.user.id}> has been unmuted.`);
        }, ms(mutetime))
    }
    if (warns[wUser.id].warns === autoBan) {
        message.guild.member(wUser).ban(reason);
        message.channel.send(`<@${wUser.user.id}> has been banned.`);
    }
}

module.exports.help = {
    name: "warn",
    desc: "Warn a user",
    group: "Moderation",
    usage: " [user] [reason]",
    perms: "Manage Messages",
    info: `User gets automatically muted after ${autoMute} warnings and banned after ${autoBan} warnings`
}