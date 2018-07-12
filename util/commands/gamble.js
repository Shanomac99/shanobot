
const Ssaccess = require("../currency/ssaccess.js");
const Numcheck = require("../generalfunctions/numcheck.js")

const Config = require("../../config/config.json");

const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);


module.exports = {
    gamble: function(message, args) {
    Numcheck.numcheck(message, args[1], 1, function(success) {
        if (success === false) return;
        Ssaccess.ssaccess(message, message.member.id, function(newuser, rows) {
            if (parseFloat(rows[0].bal) < parseFloat(args[1])) return message.reply(Config.messages.num.lowbal);

            async.series([

                function auth(step) {
                    Gdoc.useServiceAccountAuth(Gcreds, step);
                },
                function math(step) {
                    var num = Math.random()
                    if (num < 0.5) {
                        rows[0].bal = parseFloat(rows[0].bal) - parseFloat(args[1])
                        rows[0].loss = parseFloat(rows[0].loss) + 1
                        message.reply("You lost $" + args[1] + "!")
                    }
                    else {
                        rows[0].bal = parseFloat(rows[0].bal) + parseFloat(args[1])
                        rows[0].win = parseFloat(rows[0].win) + 1
                        message.reply("You won $" + args[1] + "!")
                    }
                    rows[0].save();
                }
            ])

        })  
    })
      
    }
}