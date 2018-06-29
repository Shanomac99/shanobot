// File is used to listen to discord for messages

// Requirements for this file
const Discord = require('discord.js');
const DiscordConfig = require('./auth/discordauth.json');

const MemberChange = require('./util/discord/memberchange.js');

const LogMessage = require('./util/log/log.js');
const Help = require('./util/bot/help.js');
const InfoCommands = require('./util/commands/infocommands.js');
const AdminCommands = require('./util/commands/admincommands.js');

const AdminCheck = require('./util/generalfunctions/admincheck.js');
const Config = require('./config/config.json');
const Talk = require('./util/currency/talk.js');
const Bal = require('./util/commands/bal.js');
const Baltop = require('./util/commands/topbal.js');
const Give = require("./util/commands/give.js");
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
    Talk.talk(message, function() {
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
            case "changelog":
            InfoCommands.changelog(message);
            break;
            case "info":
            InfoCommands.info(message, client);
            break;
            case "purge":
            AdminCommands.purge(message, content)
            break;
            case "admincommands":
              AdminCheck.admincheck(message, function(perms) {
                  if(perms === false) return message.reply(Config.messages.general.deny);
               Help.admincommands(message);
            })
            break;
            case "bal":
            Bal.bal(message);
            break;
            case "give":
            Give.give(message, content)
            break;
            case "balof":
            Bal.balof(message);
            break;
            case "baltop":
            case "topbal":
            Baltop.topbal(message)
            break;
            case "ecogive":
            Give.ecogive(message, content);
            break;
            default:
            message.reply("That command does not exist.")
        }
    })
})