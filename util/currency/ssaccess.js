const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.currencysheet);

const Sscheck = require("./sscheck.js");

module.exports = {
    ssaccess: function(message, userid, callback) {
        var rows;

        //Data check
        if (userid === undefined) return callback({data: null, success: false});

        async.series([

        function auth(step) {
            Gdoc.useServiceAccountAuth(Gcreds, step);
        },

        function getrow(step) {
            var query = "userid = " + userid;
            Gdoc.getRows(2, {
                query: query
            },
                function (err, obtainedrows) {
                        rows = obtainedrows;
                        if (err !== null) console.log("Error: " + err)
                        step();
                })
        },

        function checkforuser(step) {

            Sscheck.sscheck(message, userid, rows, function(newuser, obtainedrows) {
                rows = obtainedrows
                callback(newuser, rows)
            })
        }
        ])
    }
}