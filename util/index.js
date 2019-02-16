/*
Index all of the files 
**/

// Bot
exports.bot = {};
exports.bot.help = require("./bot/help.js"); 


// Commands
exports.commands = {};
exports.commands.admincommands = require("./commands/admincommands.js");
exports.commands.bal = require("./commands/bal.js");
exports.commands.gamble = require("./commands/gamble.js");
exports.commands.give = require("./commands/give.js");
exports.commands.infocommands = require("./commands/infocommands.js");
exports.commands.stats = require("./commands/stats.js");
exports.commands.topbal = require("./commands/topbal.js");

// Currency
exports.currency = {};
exports.currency.ssacess = require("./currency/ssaccess.js");
exports.currency.sscheck = require("./currency/sscheck.js");
exports.currency.talk = require("./currency/talk.js");

// Discord
exports.discord = {};
exports.discord.memberchange = require("./discord/memberchange.js");
exports.discord.guildcatch = require("./discord/guildcatch.js");
exports.discord.channelblock = require("./discord/channelblock.js");

// General Functions
exports.generalfunctions = {};
exports.generalfunctions.admincheck = require("./generalfunctions/admincheck.js");
exports.generalfunctions.embed = require("./generalfunctions/embed.js");
exports.generalfunctions.numcheck = require("./generalfunctions/numcheck.js");

// Log
exports.log = {};
exports.log.attachcheck = require("./log/attachcheck.js");
exports.log.log = require("./log/log.js");
exports.log.ssaccess = require("./log/ssaccess.js");
exports.log.sscheck = require("./log/sscheck.js");
exports.log.sslengthcheck = require("./log/sslengthcheck.js");