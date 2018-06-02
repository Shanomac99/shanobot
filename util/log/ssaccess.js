const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.logsheet);

module.exports = {
    ssaccess: function(messageinput, sheetsid) {
        async.series([
            function auth(step) {
                Gdoc.useServiceAccountAuth(Gcreds, function(err) {
                    step();
                })
            },
            function addrow() {
                Gdoc.addRow(sheetsid, {
                    date: messageinput.date,
                    username: messageinput.username,
                    userid: messageinput.userid,
                    channel: messageinput.chanel,
                    message: messageinput.message,
                    attachments: messageinput.attachment,
                    embed: messageinput.embed
                }, function(err, rows){
                    rows.save();
                })
            }
        ])
    }

}