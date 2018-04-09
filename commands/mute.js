const Discord = require("discord.js");
const ms = require("ms");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let tomute = message.mentions.members.first();
    if (!tomute) return message.channel.send("Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be muted!");
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

    let muteTime = args[1];
    if (muteTime && !ms(muteTime)) return message.channel.send("Specify a valid time.");

    await(tomute.addRole(muterole.id));
    message.delete().catch();
    if (muteTime) {
        message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(muteTime))}`);
        
        setTimeout(function(){
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> has been unmuted!`);
        }, ms(muteTime));
    }
    else message.channel.send(`<@${tomute.id}> has been muted.`)
}

module.exports.help = {
    name: "mute",
    desc: "Mute a user",
    usage: " [user] (time)"
}