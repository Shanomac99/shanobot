
const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

const Ssaccess = require("../currency/ssaccess.js");
const Numcheck = require("../generalfunctions/numcheck.js");
const Config = require("../../config/config.json");

module.exports = { 
    give: function(message, args) {
        if (message.mentions.members.first() === undefined) return message.reply(Config.messages.general.nomention);
        if (message.mentions.members.first().bot) return message.reply(config.messages.num.bot);
        Numcheck.numcheck(message, args[1], 1, function(success) {
            if (success === false) return;
            Ssaccess.ssaccess(message, message.member.id, function(newuser, rows) {

                if (parseFloat(args[1]) > parseFloat(rows[0].bal)) return message.reply(Config.messages.num.lowbal);

                async.series([

                    function auth(step) {
                        Gdoc.useServiceAccountAuth(Gcreds, step)
                    },

                    function subbal(step) {
                        rows[0].bal = parseFloat(rows[0].bal) - parseFloat(args[1]);
                        rows[0].save();
                        step();
                    },

                    function addbal(step){
                        Ssaccess.ssaccess(message, message.mentions.members.first().id, function(newuser, rows) {
                            rows[0].bal = parseFloat(rows[0].bal) + parseFloat(args[1]);
                            rows[0].save();
                            step();
                        })
                    },

                    function sendmessage(step){
                        message.reply("You have given $" + args[1] + " to " + message.mentions.members.first().user.username)
                        return;
                    }
                ])
            })
        })
    }
}