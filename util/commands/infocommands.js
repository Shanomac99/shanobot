
const Embed = require("../generalfunctions/embed.js")

module.exports = {
    changelog: function (message){
        message.reply("You can see the change log here: http://bit.ly/2tfmYrF")
    },
    info: function(message, client){

        Embed.embed(message, function(embed) {
            // Setup Ping
            var ping = Math.floor(client.ping);
            
            //Var setup, using 3 because there are 4 times
            var i = 3
            var final;
            var t = 0
            var time = client.uptime;
            var uptime = []
            uptime[0] = {"time": time / 1000, "prefix": "seconds" }
            uptime[1] = {"time": time / 60000, "prefix": "minutes"}
            uptime[2] = {"time": time / 3600000, "prefix": "hours"}
            uptime[3] = {"time": time / 86400000, "prefix": "days"}
            // Testing to see which one to use
            while (t < 1) {
                t = uptime[i].time
                final = uptime[i].prefix
                 i--
                } 
                // Seting up Embed
              embed = embed
              .addField("Ping", ping + " ms")
              .addField("Uptime", Math.floor(t) + " " +  final)
              .addField("Users", client.users.size);
              message.channel.send({embed})
        });
    }
}