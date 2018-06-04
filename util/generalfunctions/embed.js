const Discord = require('discord.js');

module.exports = {
    embed: function(message, callback) {
        var embed = new Discord.RichEmbed()
            .setTitle("Shano Bot Help")
            .setColor('#f4b042')
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()

            callback(embed);
    }
}