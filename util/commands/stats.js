const Ssaccess = require("../currency/ssaccess.js");
const Config = require("../../config/config.json");
module.exports = {
    stats: function(message) {
        Ssaccess.ssaccess(message, message.member.id, function(newuser, rows) {
            message.reply("You have " + rows[0].loss + " losses and " + rows[0].win + " wins");
        })
    },
    statsof: function(message) {
        if (message.mentions.members.first() === undefined) return message.reply(Config.messages.general.nomention);
        if (message.mentions.members.first().user.bot) return message.reply(Config.messages.num.bot);
        console.log(message.mentions.members.first().user.bot);
        Ssaccess.ssaccess(message, message.mentions.members.first().id, function(newuser, rows) {
            message.reply("You have " + rows[0].loss + " losses and " + rows[0].win + " wins");
        })
    }
}