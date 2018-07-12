const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

const Ssaccess = require("./ssaccess.js")

module.exports = {
    talk: function(message, callback) {
        Ssaccess.ssaccess(message, message.member.id, function(newuser, rows){
            async.series([
                function auth(step) {
                    Gdoc.useServiceAccountAuth(Gcreds, step);
                },
                function add(step){
                    var date = new Date();
            var cooldown = date.getTime();
    
            // Prevents bots/user macros from getting exact timing on currency gain
    
            var variability = -100000 - 1000 * date.getDay() - 1000 * date.getHours() - 100 * date.getMinutes() - 10 * date.getSeconds() - date.getMilliseconds();
            if (newuser === true) {
    
                var rand = Math.trunc(Math.random() * 10)
                if (rand > 5) rand = rand - 5
                rows[0].bal = parseFloat(rows[0].bal) + rand;
                rows[0].cooldown = cooldown
                rows[0].save();
            }
            else {
    
                var usercooldown = rows[0].cooldown - cooldown
    
                if (usercooldown < variability) {
                
                var rand = Math.trunc(Math.random() * 10)
                if (rand > 5) rand = rand - 5
                rows[0].bal = parseFloat(rows[0].bal) + rand;
                rows[0].cooldown = cooldown
                rows[0].save();
                
                 }
            }
            callback();
                }
            ])
        
        })

    }
}