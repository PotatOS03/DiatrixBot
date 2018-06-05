const Discord = require("discord.js");
const errors = require("../utilities/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "Manage Roles");
    let rMember = message.mentions.members.first();
    if (!rMember) return errors.usage(message, "addrole", `Couldn't find user ${args[0] || ""}`);
    let role = args.slice(1).join(" ");
    if (!role) return errors.usage(message, "addrole", "No role specified");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return errors.usage(message, "addrole", `Couldn't find role: ${role}`);

    if (rMember.roles.has(gRole.id)) return errors.other(message, `They already have the **${gRole.name}** role.`);
    await (rMember.addRole(gRole.id));

    message.delete().catch();
    try {
        await rMember.send(`You have been given the **${gRole.name}** role in ${message.guild.name}.`)
    } catch (e) {
        message.channel.send(`<@${rMember.id}> has been given the **${gRole.name}** role.`)
    }
}

module.exports.help = {
    name: "addrole",
    desc: "Give a role to a user",
    group: "Server",
    usage: " [user] [role]",
    perms: "Manage Roles"
}