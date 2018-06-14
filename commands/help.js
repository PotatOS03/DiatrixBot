const Discord = require("discord.js");
const fs = require("fs");
let cmds = [];
let groups = [];

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    jsfile.forEach((f, i) => {
        let props = require(`../commands/${f}`);
        cmds.push(props.help);
        if (!groups.includes(props.help.group) && props.help.group) groups.push(props.help.group);
    });
})

module.exports.run = async (bot, message, args) => {
    let servers = require("../servers.json");
    
    let arg = args.slice(0).join(" ");
    for (var i = 0; i < cmds.length; i++) {
        if (arg === cmds[i].name) {
            let cmdEmbed = new Discord.RichEmbed()
            .setDescription(`**${arg}** command help`)
            .setColor("f04747")
            .addField("Usage \`[required] (optional)\`", "`" + `${servers[message.guild.id].prefix}${arg}${(cmds[i].usage || "")}` + "`")
            .addField("Description", cmds[i].desc)
            if (cmds[i].group) cmdEmbed.addField("Category", cmds[i].group)
            if (cmds[i].perms) cmdEmbed.addField("Required Permission", cmds[i].perms)
            if (cmds[i].dm) cmdEmbed.addField("Allowed in DM", "Yes")
            else cmdEmbed.addField("Allowed in DM", "No")
            if (cmds[i].info) cmdEmbed.addField("More Information", cmds[i].info)
            .setFooter(`To view all commands, type "${servers[message.guild.id].prefix}help (page)"`);

            return message.channel.send(cmdEmbed);
        }
    }

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("List of commands")
    .setColor("f04747")
    .addField(`${message.guild.name} prefix:`, servers[message.guild.id].prefix)
    
    for (var i = 0; i < groups.length; i++) {
        let longestName = 0;
        for (var j = 0; j < cmds.length; j++) {
            if (cmds[j].name.length > longestName && cmds[j].group === groups[i]) longestName = cmds[j].name.length;
        }

        let cmdsText = "";
        for (var j = 0; j < cmds.length; j++) {
            if (cmds[j].group === groups[i]) {
                cmdsText += `\`${cmds[j].name}`;
                for (var k = cmds[j].name.length; k < longestName; k++) {
                    cmdsText += " ";
                }
                cmdsText += `   |\` ${cmds[j].desc}\n`;
            }
        }
        if (groups[i] !== "Developer") helpEmbed.addField(`${groups[i]}`, cmdsText)
    }
    helpEmbed.setFooter(`Type "${servers[message.guild.id].prefix}help (command)" to view more information about a command`);

    try {
        await message.author.send(helpEmbed);
        message.react("👍");
        message.channel.send("Help page has been sent through DM");
    } catch (e) {
        message.channel.send(helpEmbed);
    }
}

module.exports.dm = async (bot, message, args) => {
    let botconfig = require("../botconfig.json");

    let arg = args.slice(0).join(" ");
    for (var i = 0; i < cmds.length; i++) {
        if (arg === cmds[i].name) {
            let cmdEmbed = new Discord.RichEmbed()
            .setDescription(`**${arg}** command help`)
            .setColor("f04747")
            .addField("Usage \`[required] (optional)\`", "`" + `${botconfig.prefix}${arg}${(cmds[i].usage || "")}` + "`")
            .addField("Description", cmds[i].desc)
            if (cmds[i].perms) cmdEmbed.addField("Required Permission", cmds[i].perms)
            if (cmds[i].dm) cmdEmbed.addField("Allowed in DM", "Yes")
            else cmdEmbed.addField("Allowed in DM", "No")
            if (cmds[i].info) cmdEmbed.addField("More Information", cmds[i].info)
            .setFooter(`To view all commands, type "${botconfig.prefix}help (page)"`);

            return message.channel.send(cmdEmbed);
        }
    }

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("List of commands")
    .setColor("f04747")
    .addField(`Prefix:`, botconfig.prefix)

    for (var i = 0; i < groups.length; i++) {
        let longestName = 0;
        for (var j = 0; j < cmds.length; j++) {
            if (cmds[j].name.length > longestName && cmds[j].group === groups[i]) longestName = cmds[j].name.length;
        }

        let cmdsText = "";
        for (var j = 0; j < cmds.length; j++) {
            if (cmds[j].group === groups[i]) {
                cmdsText += `\`${cmds[j].name}`;
                for (var k = cmds[j].name.length; k < longestName; k++) {
                    cmdsText += " ";
                }
                cmdsText += `   |\` ${cmds[j].desc}\n`;
            }
        }
        if (groups[i] !== "Developer") helpEmbed.addField(`${groups[i]}`, cmdsText)
    }
    helpEmbed.setFooter(`Type "${botconfig.prefix}help (command)" to view more information about a command`)

    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "help",
    desc: "See a list of commands or information about a command",
    group: "Information",
    usage: " (command)",
    dm: true
}