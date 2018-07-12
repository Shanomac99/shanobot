
const Config = require("../../config/config.json");

const AdminCheck = require("../generalfunctions/admincheck.js");
const NumCheck = require("../generalfunctions/numcheck.js");

module.exports = {
    purge: function (message, content) {

        AdminCheck.admincheck(message, function(perms) {
            if (perms === false) return;

            NumCheck.numcheck(message, content[1], 1, function(success) {
                if (success === false) return;
                
                var purgenum = parseInt(content[1]);

                if (purgenum === 0) return message.reply(Config.messages.num.zeronum);

                if (purgenum > 99) {
                    message.channel.bulkDelete(99);
                    return message.reply(Config.messages.purge.toohigh)
                }

                if (purgenum <= 98) {
                    purgenum = purgenum + 1;
                    message.channel.bulkDelete(purgenum);
                    return message.reply((purgenum - 1) + Config.messages.purge.purge)
                }

                if (pargenum = 99) {
                    message.channel.bulkDelete(purgenum);
                    return message.reply(purgenum + Config.messages.purge.purge)
                }
            })
        })

    }
}