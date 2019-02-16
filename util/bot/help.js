const Discord = require('discord.js');
const client = new Discord.Client();

const Embed = require("../generalfunctions/embed.js")

module.exports = {
    help: function(message) {
    Embed.embed(message, function (embed) {
        var embed = embed
        .addField("=help", "Displays this help message")
        .addField("=info", "Displays info on the bot")
        .addField("=changelog", "Displays the changelog")
        .addField("=bal", "Check your bal")
        .addField("=balof", "Check the bal of someone else")
        .addField("=baltop", "Shows top 10 users balance")
        .addField("=give", "Gives money to a user")
        .addField("=stats", "Gives your stats")
        .addField("=statsof", "Gives stats of another user")
        .addField("=gamble", "Gamble money, 50/50 chance")
        .addField("Commands/Usage", "More detailed info here: https://bit.ly/2lfDAMi");
        message.channel.send({ embed });
    });
    },
    admincommands: function(message) {
        Embed.embed(message, function(embed) {
            embed = embed
            .addField("=purge", "Purges # of messages")
            .addField("=ecogive","Creates money for a user")
            .addField("Commands/Usage", "More detailed info here: https://bit.ly/2lfDAMi");
            message.channel.send({ embed });
        })
    }
}