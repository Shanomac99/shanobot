const async = require('async');
const GoogleSpreadsheet = require('google-spreadsheet');

const GoogleAccess = require('../../auth/googleaccess.json');
const Gcreds = require('../../auth/googleauth.json')

const Gdoc = new GoogleSpreadsheet(GoogleAccess.guildsheet);

module.exports = {
    // Returns guild:
    /*
        guild.guildId =  Guild Id
        guild.guildChatBans = Channels that are banned from the bot talking in
        guild.guilldAdminRole = The admin role for the guild
    */
    findguild: function(guildId, callback){

        async.series([

            function auth(step) {
               Gdoc.useServiceAccountAuth(Gcreds, function(err) {
                   step();
                })
           },

           function getrows(step) {
            // Used to search rows given paramaters
            var query = "guildid = " + guildId;
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
                if (rows === undefined || rows[0] === undefined) {
                    // If not then go to next step
                    step();
                }
                else {
                    // If it does then exit this file with object created
                    var guild = {
                    guildId : guildId,
                    guildChatBans: rows[0].guildchatbans,
                    guilldAdminRole: rows[0].guildadminrole
                    };
                    callback(guild);
                }
            },

            function createrow(step){
                Gdoc.addRow(1, {
                    guildid:  guildId,
                    guildchatbans:  "",
                    guildadminrole: ""
                },
                 function(err, obtainedrows){
                    if (err !== null) console.log("Error: " + err)
                    obtainedrows.save();
                    var rows = obtainedrows
                    guild = {
                        guildId : guildId,
                        guildChatBans:"",
                        guilldAdminRole: ""
                        };
                    callback(guild);
                })

            }

        ])
    }

}