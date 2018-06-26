const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

const Ssaccess = require("../currency/ssaccess.js")
const Config = require("../../config/config.json")
const Embed = require("../generalfunctions/embed.js")

module.exports = {
    topbal: function(message) {
        async.series([
            function auth(step) {
                Gdoc.useServiceAccountAuth(Gcreds, step);
            },

            function grabrows(step){
                Gdoc.getRows(2, {
                    orderby: 'bal',
                    reverse: 'false'
                }, function(err, rows) {
                    var user = []

                    for (i = 0; i<10; i++) {
                        var username = message.guild.members.get(rows[i].userid).user.username;
                        if (username.length > 20) {
                                  
                            var username = username.substr(0,20) + "..."
                        }

                        user.push({username: username, bal: rows[i].bal})
                    }
                    Embed.embed(message, function(embed) {
                        for (i = 0; i<10; i++) {
                            embed = embed
                            .addField("**" + (i + 1) + ")** " + user[i].username, user[i].bal, true)
                        }
                        message.channel.send({embed})
                    })

                })
            }
        ])
    }
}