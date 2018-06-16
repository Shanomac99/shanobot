const Discord = require('discord.js');
const client = new Discord.Client();

const Embed = require("../generalfunctions/embed.js")

module.exports = {
    help: function(message) {
    Embed.embed(message, function (embed) {
        var embed = embed
        .addField("=help", "Displays this help message")
        .addField("Commands", "More detailed info here: https://bit.ly/2lfDAMi");
        message.channel.send({ embed });
    });
    }
}