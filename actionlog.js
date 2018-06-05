// Set up the bot and Discord library
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

let logChannel = "action-log";

module.exports.log = async(bot) => {
    /*
    bot.on("channelCreate", async channel => {
        try {
            let actionLogChannel = channel.guild.channels.find(`name`, logChannel);
        
            let logEmbed = new Discord.RichEmbed()
            .setTitle(`New ${channel.type} channel created`)
            .setColor("f04747")
            .addField("Channel", channel, true)
            .addField("Position", channel.position, true);
        
            actionLogChannel.send(logEmbed);
        } catch(e) {}
    });
    
    bot.on("channelDelete", async channel => {
        let actionLogChannel = channel.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Channel deleted`)
        .setColor("f04747")
        .addField("Channel", channel.name, true)
        .addField("Position", channel.position, true);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("channelPinsUpdate", async (channel, time) => {
        let actionLogChannel = channel.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Channel pins updated`)
        .setColor("f04747")
        .addField("Channel", channel, true)
        .addField("Time", time, true);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("channelUpdate", async (oldChannel, newChannel) => {
        let actionLogChannel = newChannel.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Channel updated`)
        .setColor("f04747")
        .addField("Channel", newChannel);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("channelUpdate", async (oldChannel, newChannel) => {
        let actionLogChannel = newChannel.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Channel updated`)
        .setColor("f04747")
        .addField("Channel", newChannel);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("emojiCreate", async emoji => {
        let actionLogChannel = emoji.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`New emoji created`)
        .setColor("f04747")
        .addField("Emoji", emoji, true)
        .addField("Name", emoji.name, true);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("emojiDelete", async emoji => {
        let actionLogChannel = emoji.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Emoji deleted`)
        .setColor("f04747")
        .addField("Emoji", emoji);
        
        actionLogChannel.send(logEmbed);
    });
    
    bot.on("emojiUpdate", async emoji => {
        let actionLogChannel = emoji.guild.channels.find(`name`, logChannel);
    
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Emoji updated`)
        .setColor("f04747")
        .addField("Emoji", emoji, true)
        .addField("Old name", emoji.name, true);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildBanAdd", async (guild, user) => {
        let actionLogChannel = guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Member banned`)
        .setColor("f04747")
        .addField("Member", `${user.username}#${user.discriminator}`);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildBanRemove", async (guild, user) => {
        let actionLogChannel = guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Member unbanned`)
        .setColor("f04747")
        .addField("Member", user);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildMemberAdd", async member => {
        let actionLogChannel = member.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Member joined`)
        .setColor("f04747")
        .addField("Member", member, true)
        .addField("Account created", member.user.createdAt);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildMemberRemove", async member => {
        let actionLogChannel = member.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Member left`)
        .setColor("f04747")
        .addField("Member", member);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildMemberUpdate", async (oldMember, newMember) => {
        let actionLogChannel = newMember.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Member updated`)
        .setColor("f04747")
        .addField("Member", newMember)
        if (oldMember.nickname !== newMember.nickname) {
            logEmbed.addField("Old nickname", oldMember.nickname, true)
            .addField("New nickname", newMember.nickname, true);
        }
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("guildUpdate", async (oldGuild, newGuild) => {
        let actionLogChannel = newGuild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Server updated`)
        .setColor("f04747")
        .addField("Member", member);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("messageDelete", async message => {
        let actionLogChannel = message.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Message deleted`)
        .setColor("f04747")
        .addField("Author", message.author, true)
        if (message.content && message.content.length <= 1024) logEmbed.addField("Message", message.content, true);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("messageUpdate", async (oldMessage, newMessage) => {
        if (oldMessage.content && newMessage.content) {
            let actionLogChannel = newMessage.guild.channels.find(`name`, logChannel);
            
            let logEmbed = new Discord.RichEmbed()
            .setTitle(`Message updated`)
            .setColor("f04747")
            .addField("Author", newMessage.author)
            .addField("Old message", oldMessage.content, true)
            .addField("New message", newMessage.content, true);
            
            actionLogChannel.send(logEmbed);
        }
    });

    bot.on("roleCreate", async role => {
        let actionLogChannel = role.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Role created`)
        .setColor("f04747")
        .addField("Role", role);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("roleDelete", async role => {
        let actionLogChannel = role.guild.channels.find(`name`, logChannel);

        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Role deleted`)
        .setColor("f04747")
        .addField("Role", role.name);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("roleUpdate", async (oldRole, newRole) => {
        let actionLogChannel = newRole.guild.channels.find(`name`, logChannel);
        
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`Role updated`)
        .setColor("f04747")
        .addField("Role", newRole);
        
        actionLogChannel.send(logEmbed);
    });

    bot.on("userUpdate", async (oldUser, newUser) => {
        let actionLogChannel = newUser.guild.channels.find(`name`, logChannel);
        console.log(oldUser)
        let logEmbed = new Discord.RichEmbed()
        .setTitle(`User updated`)
        .setColor("f04747")
        .addField("User", newUser)
        .addField("Old name", `${oldUser.username}#${oldUser.discriminator}`, true)
        .addField("New name", `${newUser.username}#${newUser.discriminator}`, true);
        
        actionLogChannel.send(logEmbed);
    });
    */
}