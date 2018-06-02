const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.logsheet);

var rows;
var data;
var sheetsid;

module.exports = {
    sslengthcheck: function(messageinput, sheetsid, callback) {
        async.series([
            function auth(step){
                // Login with Google
                Gdoc.useServiceAccountAuth(Gcreds, function(err) {
                    step();
                });
            },

            function getrows(step) {
                Gdoc.getRows(sheetsid, {},
                 function(err, obtainedrows) {
                     rows = obtainedrows
                        step();
                    }
                
                )
            },

            function checklength(step) {
                if (rows.length >= 2000){
                    
                    step();
                }
                else {
                    callback(sheetsid);
                }
            },

            function grabsheet(step) {
                Gdoc.getInfo( function(err, obtaineddata) {
                    data = obtaineddata
                    step();
                })
            },
            
            function renamesheet(step) {
                var date = new Date
                data.worksheets[sheetsid-1].setTitle('old ' + sheetsid + date, callback(sheetsid) );
                step();
            },
            function editindex(step) {
                query = "channelid = " + messageinput.channelid
                Gdoc.getRows(1, {
                    query: query
                }, function(err, rows){
                    console.log(rows);
                    rows[0].channelid = messageinput.channelid + " old";
                    rows[0].save();
                    callback(sheetsid);
                })
            }
        ])
    }
}