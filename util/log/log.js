// Requirement setup
const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json');
const SSCheck = require('./sscheck.js');
const SSLengthCheck = require('./sslengthcheck.js');
const AttachCheck = require('./attachcheck.js');
const SSAccess = require('./ssaccess.js')
const Gdoc = new GoogleSpreadsheet(GoogleAccess.logsheet);


module.exports = {
    log: function (message) {
        if (message.content.startsWith("=")) var messagecontent = " " + message.content;

        AttachCheck.attachcheck(message, function (attachment, embed) {
        
            var messageinput = {
            attachment: attachment,
            channelid: message.channel.id,
            channel : message.channel.name,
            date : new Date(),
            embed: embed,
            message : messagecontent,
            username: message.author.username,
            userid : message.member.id
            };

            SSCheck.sscheck(messageinput, function(sheetsid) {
            // If the log is above 2000 rows it moves it to old and creates a new one
            SSLengthCheck.sslengthcheck(messageinput, sheetsid, function (sheetsid){
                    SSAccess.ssaccess(messageinput,sheetsid);
                });
            });
         });
    }
}