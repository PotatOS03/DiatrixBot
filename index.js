// Basic bot setup - this is what lets the bot interact with Discord
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

// Read and write to other files in the bot folder
const fs = require("fs");

// File for the bot configuration - includes default prefix
const botconfig = require("./botconfig.json");

// Action log file
let actionlog = require("./actionlog.js");
// Coins file of all users
let coins = require("./coins.json");
// XP file of all users
let xp = require("./xp.json");

// Setup of all commands in the commands folder
fs.readdir("./commands", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return; // If no commands exist in the folder
  }
  
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
    console.log(`${f} loaded!`);
  });
});

bot.on("ready", async () => { // When the bot is loaded
  console.log(`${bot.user.username} is online in ${bot.guilds.size} servers!`);
  bot.user.setActivity(`Default Prefix: ${botconfig.prefix}`);
});

// Setup of action log
actionlog.log(bot);

bot.on("guildMemberAdd", async member => { // When a member joins the server
  let welcomeChannel = member.guild.channels.find(`name`, "general"); // Channel to send welcome message
  welcomeChannel.send(`${member} has joined **${member.guild.name}**! Welcome!`); // Sends a welcome message
});

bot.on("guildMemberRemove", async member => { // When a member leaves the server or gets kicked
  let welcomeChannel = member.guild.channels.find(`name`, "general"); // Channel to send leave message
  welcomeChannel.send(`Goodbye, ${member} has left the server.`); // Sends a leave message
});

//Star board (for later)
/*bot.on("messageReactionAdd", async (messageReaction, user) => {
  let starBoard = messageReaction.message.guild.channels.find(`name`, "star-board");
  if (!messageReaction.message.reactions.get("⭐")) return;
  if (messageReaction.message.reactions.get("⭐").count >= 1 && messageReaction.message.channel.name !== "star-board") {
    let starEmbed = new Discord.RichEmbed()
    .setColor("f04747")
    .setThumbnail(messageReaction.message.author.displayAvatarURL)
    .addField("Author", `<@${messageReaction.message.author.id}>`)
    .addField("Message", messageReaction.message.content)
    .addField("Channel", messageReaction.message.channel)
    .setTimestamp(messageReaction.message.createdAt);

    starBoard.send(starEmbed);
    messageReaction.message.clearReactions();
  }
});*/

bot.on("message", async message => { // When a message is sent
  if (message.author.bot) return; // Ignores the message if it is sent by a bot

  // Get certain parts of the message sent
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  // DM commands
  if (message.channel.type === "dm") {
    if (!message.content.startsWith(botconfig.prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(botconfig.prefix.length));
    if (commandfile) commandfile.dm(bot, message, args);
    return;
  }
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8")); // File for custom server prefixes
  
  // If the prefixes file doesn't have a custom prefix for the server yet
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix // Set the server's prefix to the default one
    };
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err); // Save the prefix
    });
  }
  
  // Simplify the server's prefix into the prefix variable
  let prefix = prefixes[message.guild.id].prefixes;
  
  // If the message starts with the prefix
  if (message.content.startsWith(prefix)) {
    // If the message is a command, run the command
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) return commandfile.run(bot, message, args);
  }

  // If the user doesn't have any coins, give them 0 coins
  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 0
    };
  }
  
  let coinAmount = Math.floor(Math.random() * 60) + 1;
  let baseAmount = Math.floor(Math.random() * 60) + 1;
  
  // Small chance that the user is awarded coins
  if (coinAmount === baseAmount) {
    coins[message.author.id].coins += Math.floor(coinAmount / 3) + 1; // Give the user a random amount of coins
    // Save their coins
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err);
    });
  
    // Message for when coins are added
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("f04747")
    .addField("💸", `${Math.floor(coinAmount / 3)} coins added!`)
    .addField("Total Coins", coins[message.author.id].coins);
  
    message.channel.send(coinEmbed).then(msg => {msg.delete(10000)});
  }
  
  // Random amount of XP added for each message
  let xpAdd = Math.floor(Math.random() * 5) + 15;
  
  // If the user doesn't have any XP
  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0, // Give them 0 XP
      level: 1 // Level starts at 1
    };
  }
  
  // How much XP is needed to reach the next level
  let nextLevel = Math.floor(Math.pow(xp[message.author.id].level, 1.5) * 3) * 100;
  // Give the user the random amount of XP
  xp[message.author.id].xp += xpAdd;
  
  // If the user has enough XP to level up
  if (nextLevel <= xp[message.author.id].xp) {
    xp[message.author.id].level++; // Increase their level by 1
  
    // Message to send
    let levelUp = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("f04747")
    .addField("User", message.author.username)
    .addField("New Level", xp[message.author.id].level);
  
    message.channel.send(levelUp).then(msg => {msg.delete(10000)});
  }
  // Save their XP
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err);
  });
  return;
});

// Log into the bot using the token
bot.login(process.env.BOT_TOKEN);
