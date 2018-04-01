const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let cooldown = new Set();
let cdSeconds = 5;

fs.readdir("./commands", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
    console.log(`${f} loaded!`);
  });

})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`Default Prefix: ${botconfig.prefix}`);
});

bot.on("guildMemberAdd", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "bot");
  welcomeChannel.send(`Welcome! ${member} has joined **${member.guild.name}**!`);
});

bot.on("guildMemberRemove", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "bot");
  welcomeChannel.send(`Goodbye, ${member} has left the server.`);
})

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
    console.log(prefixes);
  }

  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmount = Math.floor(Math.random() * 60) + 1;
  let baseAmount = Math.floor(Math.random() * 60) + 1;

  if (coinAmount === baseAmount) {
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + Math.floor(coinAmount / 3)
    }
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err);
    });

    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("f04747")
    .addField("💸", `${Math.floor(coinAmount / 3)} coins added!`)
    .addField("Total Coins", coins[message.author.id].coins);

    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
  }

  let xpAdd = Math.floor(Math.random() * 5) + 15;
  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  let nextLevel = Math.floor(Math.pow(xp[message.author.id].level, 1.5) * 3) * 100;
  xp[message.author.id].xp += xpAdd;
  if (nextLevel <= xp[message.author.id].xp) {
    xp[message.author.id].level++;
    let levelUp = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("f04747")
    .addField("User", message.author.username)
    .addField("New Level", xp[message.author.id].level);

    message.channel.send(levelUp).then(msg => {msg.delete(10000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err);
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply(`You have to wait ${cdSeconds} seconds between commands.`);
  }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    cooldown.add(message.author.id);
  }

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdSeconds * 1000);
});

bot.login(process.env.tokenfile.token);
