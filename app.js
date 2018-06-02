// File is used to listen to discord for messages

// Requirements for this file
const Discord = require('discord.js');
const DiscordConfig = require('./auth/discordauth.json')

const MemberChange = require('./util/discord/memberchange.js');

const LogMessage = require('./util/log/log.js');

// Dicord Client setup
const client = new Discord.Client();

// Login to Discord APi
client.login(DiscordConfig.token);

// Client Readyup
client.on("ready", () => {
 console.log("Shanobot startup");
 client.user.setActivity("Use =help");
});

client.on("guildMemberAdd", member => {
    MemberChange.onjoin(member);
});

client.on("guildMemberRemove", member => {
    MemberChange.onleave(member);
});

client.on("message", message => {
    LogMessage.log(message)
})