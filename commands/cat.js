const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	
	superagent.get(`http://aws.random.cat/meow`).then(function(res) {
		console.log(res.text);
		console.log(res.text.substring(9, res.text.length-2).replaceAll("/", ""));
		
		let catembed = new Discord.RichEmbed()
		.setColor("#ff9900")
		.setImage(res.text.substring(9, res.text.length-2).replaceAll("/", ""));
	
		message.channel.send(catembed);
    });
}

module.exports.help = {
	name: "cat"
}