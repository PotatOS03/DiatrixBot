const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "Manage Roles");

    let rMember = message.mentions.members.first();
    if (!rMember) return errors.usage(message, "removerole", "Couldn't find user");

    let role = args.slice(1).join(" ");
    if (!role) return errors.usage(message, "removerole", "No role specified");

    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return errors.usage(message, "removerole", `Couldn't find role: ${role}`);

    if (!rMember.roles.has(gRole.id)) return errors.other(message, `They don't have the **${gRole.name}** role.`);
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
    group: "Server",
    usage: " [user] [role]",
    perms: "Manage Roles"
}