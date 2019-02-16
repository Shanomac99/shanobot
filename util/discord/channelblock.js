const util = require("../index.js");

module.exports = {
    // true = found channel, false = did not find
    checkBlocked: function(guild, channelId) {

        var blockedchannels = guild.guildChatBans.split(",");
        for(var i = 0; i < blockedchannels.length; i ++){
            if(blockedchannels[i] == channelId){
                return true;
            };
        };
        return false;
       
    }

}