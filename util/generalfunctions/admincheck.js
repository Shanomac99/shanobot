const Config = require("../../config/config.json")

module.exports = {
    admincheck: function(message, callback) {
        if(!message.member.roles.has(Config.id.botpermid)) 
        {
             message.reply(Config.messages.general.deny);
             return callback(false);
        }
        return callback(true); 
    }
}