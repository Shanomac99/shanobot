
const configfile = require("../../config/config.json");

module.exports ={
onjoin: function (member) {
    member.guild.channels.find("id", configfile.id.memberalertid)
    .send("Welcome to " + configfile.serverdetails.servername + " " + member + "! Make sure you read the rules in <#" + configfile.id.rulechannelid + ">!")
},
 onleave: function (member) {
    member.guild.channels.find("id", configfile.id.memberalertid)
    .send(member.user.username + " has left the discord! Who knows if they will return!")

    //Delete data here
}
}