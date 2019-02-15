// File is used to listen to discord for messages

const util = require("./util");
// Requirements for this file
const Discord = require('discord.js');
const DiscordConfig = require('./auth/discordauth.json');

const MemberChange = require('./util/discord/memberchange.js');


const Config = require('./config/config.json');

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
    util.currency.talk.talk(message, function() {
        util.log.log.log(message)

        if (message.author.bot) return;
        var prefix = "=";
        var content = message.content.substring(prefix.length).split(" ");
        if (message.channel.id == '377128931414769666' && !message.member.roles.has('404402578449891328')) return;
        if (!message.content.startsWith(prefix)) return;
    
        switch (content[0].toLowerCase()) {
            case "help":
            util.bot.help.help(message);
            break;
            case "changelog":
            util.commands.infocommands.changelog(message);
            break;
            case "info":
            util.commands.infocommands.info(message, client);
            break;
            case "purge":
            util.commands.admincommands.purge(message, content)
            break;
            case "admincommands":
              util.generalfunctions.admincheck(message, function(perms) {
                  if(perms === false) return message.reply(Config.messages.general.deny);
               util.bot.help.admincommands(message);
            })
            break;
            case "bal":
            util.commands.bal.bal(message);
            break;
            case "stats":
            util.commands.stats.stats(message);
            break;
            case "statsof":
            util.commands.stats.statsof(message);
            break;
            case "give":
            util.commands.give.give(message, content)
            break;
            case "balof":
            util.commands.bal.balof(message);
            break;
            case "baltop":
            case "topbal":
            util.commands.topbal.topbal(message)
            break;
            case "ecogive":
            util.commands.give.ecogive(message, content);
            break;
            case "gamble":
            util.commands.gamble.gamble(message, content)
            break;
            default:
            message.reply("That command does not exist.")
        }
    })
})