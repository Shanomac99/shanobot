// File is used to listen to discord for messages

// Requirements for this file
const Discord = require('discord.js');
const DiscordConfig = require('./auth/discordauth.json')

const MemberChange = require('./util/discord/memberchange.js');

const LogMessage = require('./util/log/log.js');
const Help = require('./util/bot/help.js')

// Dicord Client setup
const client = new Discord.Client();

// Login to Discord APi
client.login(DiscordConfig.token);

// Client Readyup
client.on("ready", () => {
 console.log("Shanobot startup");
 client.user.setActivity("Use =help | Crippled");
});

client.on("guildMemberAdd", member => {
    MemberChange.onjoin(member);
});

client.on("guildMemberRemove", member => {
    MemberChange.onleave(member);
});

client.on("message", message => {
    LogMessage.log(message)

    if (message.author.bot) return;
    var prefix = "=";
    var content = message.content.substring(prefix.length).split(" ");
    if (message.channel.id == '377128931414769666' && !message.member.roles.has('404402578449891328')) return;
    if (!message.content.startsWith(prefix)) return;
    
    switch (content[0].toLowerCase()) {
        case "help":
        Help.help(message);
        break;
        default:
        message.reply("That command does not exist.")
    }
})