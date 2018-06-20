const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

module.exports = {
    sscheck: function(message, userid, rows, callback) {
        if (rows[0] === undefined) {
            var date = new Date();
            async.series([

                function auth(step) {
                    Gdoc.useServiceAccountAuth(Gcreds, step);
                },
                function addrow(step) {
                    var bal = 0
                    if (message.author.bot) bal = -99999999

                Gdoc.addRow(2, {
                    userid: userid,
                    username: message.author.username,
                    bot: message.author.bot,
                    bal: bal,
                    cooldown: date.getTime(),
                    win: 0,
                    loss: 0,
                    info: 0,
                    referral: 0
                }, function(err, obtainedrows) {
                    if (err !== null) console.log("Error: " + err)
                    obtainedrows.save();
                    rows.push(obtainedrows)
                    callback(true, rows)
                })
            }
            ])
        }
        else {
            // Most of this is to adapt old data to new data
            if(rows[0].username === "") {
                async.series([
                    function auth(step) {
                        Gdoc.useServiceAccountAuth(Gcreds, step);
                    },
                    function addusername(step) {
                        rows[0].username = message.author.username
                        rows[0].save();
                    }
                ]);
                
            }

            if (rows[0].username !== message.author.username) {
                async.series([
                    function auth(step) {
                        Gdoc.useServiceAccountAuth(Gcreds, step);
                    },
                    function addusername(step) {
                        rows[0].username = message.author.username
                        rows[0].save();
                    }
                ]);
                
            }
            if(rows[0].bot === "") {
                if (message.author.bot) {
                    async.series([
                        function auth(step) {
                            Gdoc.useServiceAccountAuth(Gcreds, step);
                        },
                        function addusername(step) {
                            rows[0].bot = true
                            rows[0].currency = -99999999
                            rows[0].save();
                        }
                    ]);
                }
                else {
                    async.series([
                        function auth(step) {
                            Gdoc.useServiceAccountAuth(Gcreds, step);
                        },
                        function addusername(step) {
                            rows[0].bot = false
                            rows[0].save();
                        }
                    ]);
                }
            }

            return callback(false, rows);
        }
    }
}