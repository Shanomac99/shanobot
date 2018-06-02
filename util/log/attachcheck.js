const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.logsheet);

module.exports = { 
    attachcheck: function(message, callback) {
        var attachments = "";
        var temparray = Array.from(message.attachments);
        if (temparray[0] !== undefined) {
            var msgattach = Array.from(message.attachments);
            var msg = msgattach[0];
            attachments = msg[1].url
        }

        var embed = [];
        if (message.embed !== undefined) {
            var length = message.embeds[0].fields.length;

            for (i = 0; i < length; i++) {
                embed.push(message.embeds[0].fields[i].name + " | " + message.embeds[0].fields[i].value);
            };

            embed = "____" + embed;
            callback(attachments, embed);
        };
        callback(attachments, embed);
    }
}