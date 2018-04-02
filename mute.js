const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
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

    let mutetime = args[1];
    if (!mutetime) return message.channel.send("You didn't specify a time!");

    await(tomute.addRole(muterole.id));
    message.delete().catch(O_o=>{});
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "mute",
    desc: "Temporarily mute a user",
    usage: " [user] [time]"
}