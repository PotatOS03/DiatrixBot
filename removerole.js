const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have the permissions.");
    let rMember = message.mentions.members.first();
    if (!rMember) return message.channel.send("Couldn't find user.");
    let role = args.slice(1).join(" ");
    if (!role) return message.channel.send("No role specified.");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.channel.send("Couldn't find that role.");

    if (!rMember.roles.has(gRole.id)) return message.channel.send(`They don't have the **${gRole.name}** role.`);
    await (rMember.removeRole(gRole.id));

    message.delete().catch(O_o=>{});
    try {
        await rMember.send(`You have lost the **${gRole.name}** role in ${message.guild.name}.`)
    } catch (e) {
        message.delete().catch(O_o=>{});
        message.channel.send(`<@${rMember.id}> has lost the **${gRole.name}** role.`)
    }
}

module.exports.help = {
    name: "removerole",
    desc: "Remove a role from a user",
    usage: " [user] [role]"
}