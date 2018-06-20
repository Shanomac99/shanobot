const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

const Ssaccess = require("../currency/ssaccess.js")
const Config = require("../../config/config.json")

module.exports = {
    bal: function(message) {

        Ssaccess.ssaccess(message, message.member.id, function(newuser, rows) {
            message.reply("You have $" + rows[0].bal);
        })
    
    },
    balof: function(message) {
        if (message.mentions.members.first() === undefined) return message.reply(Config.messages.general.nomention);
        Ssaccess.ssaccess(message, message.mentions.members.first().id, function(newuser, rows) {
            message.reply(message.mentions.members.first().user.username + " has $" + rows[0].bal);
        })
    }
}