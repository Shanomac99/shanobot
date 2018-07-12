const Discord = require('discord.js');
const client = new Discord.Client();
const Speech = require('../tts/speech.js');

module.exports = {
    voiceconnect: function(message, callback){
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join();
            Speech.speech(message, null, function(){
                console.log("1")
            })
        }
        else {
            message.reply('Please join a voice channel  ')
        }
    }
}