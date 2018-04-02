const Discord = require("discord.js");
const fs = require("fs");
let cmds = [];

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`../commands/${f}`);
        cmds.push(props.help)
    });
})

module.exports.run = async (bot, message, args) => {
    let perPage = 12;

    let totalPages = Math.ceil(cmds.length / perPage);

    let page = Math.floor(args[0]);
    if (!page || page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("List of commands")
    .setColor("f04747")
    .setFooter(`Page ${page} of ${totalPages}. Type "${prefixes[message.guild.id].prefixes}help [page]" to view a new page.`)
    .addField("Prefix", prefixes[message.guild.id].prefixes)
    
    var i = page * perPage - perPage;
    while (i < Math.min(page * perPage, cmds.length)) {
        helpEmbed.addField("`" + `${cmds[i].name}${cmds[i].usage}` + "`", cmds[i].desc)
        i++;
    };
    
    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "help",
    desc: "Generate a list of commands",
    usage: " [page]"
}