const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.logsheet);

var rows;
var sheetsid;

module.exports = {
    sscheck: function(messageinput, callback) {

        async.series([
            function auth(step) {
                // Login with Google
                Gdoc.useServiceAccountAuth(Gcreds, function(err) {
                step();
                });
            },
                // Grabing rows
            function getrows(step) {
                // Used to search rows given paramaters
                var query = "channelid = " + messageinput.channelid;
                // Get the rows
                Gdoc.getRows(1, {
                    query: query
                },
                // Take the data from the query and step
                    function(err, obtainedrows) {
                        if (err) console.log(err)
                        rows = obtainedrows;
                        step();
                    }
                )
            },

            function checkrows(step) {
                // Check if the row exists
                if (rows === undefined) step();
                if (rows[0] === undefined) {
                    // If not then go to next step
                    step();
                }
                else {
                    // If it does then exit this file
                    callback(rows[0].sheetsid);
                }
            },

            // Adding rows
            function addrow(step) {
                // Re-query the doc looking for number of rows this time
                Gdoc.getRows(1, {},
                     function(err, rows) {
                         // Add two (Naming convention starts with 1)
                        sheetsid = rows.length + 1;
                        // Adding a row
                        Gdoc.addRow(1, {
                            channelid: messageinput.channelid,
                            sheetsid: sheetsid
                        }, function(err,rows) {
                            // Save the added row (If I did not save it here and I queried the doc the row would not appear)
                            rows.save();
                            // Exit the file
                            step();
                        });
                     });
            },
            function addsheet(step) {
                var headers = ["date", "username", "userid", "channel", "message", "attachments","embed"];
                Gdoc.addWorksheet({
                    title: sheetsid,
                    headers: headers
                },
                 function(err, rows) {
                     callback(sheetsid);
                 }
                );
            }
        ]);
    }
};