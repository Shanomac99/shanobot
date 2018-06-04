const Discord = require('discord.js');
const client = new Discord.Client();

const Embed = require("../generalfunctions/embed.js")

module.exports = {
    help: function(message) {
    Embed.embed(message, function (embed) {
        console.log("1")
        var embed = embed
        .addField("=help", "Displays this help message");

        message.channel.send({ embed });
    });
    }
}