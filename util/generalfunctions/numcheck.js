const Config = require("../../config/config.json")

module.exports = {
    numcheck: function(message, num, checklevel, callback) {
        var parsenum = parseInt(num)

        switch (checklevel) {
            case 1:
            if (parsenum < 0) {
                message.reply(Config.messages.num.negnum);
                return callback(false);
            }
            case 0:
            if (num === undefined) {
                message.reply(Config.messages.num.nonum);
                return callback(false);
            }

            if (parsenum != num) {
                message.reply(Config.messages.num.badnum);
                return callback(false);
            }
            return callback(true);
             break;
            default:
            return callback(false);
             break;
        }
    }
}