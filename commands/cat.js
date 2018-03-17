const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	
	superagent.get(`http://aws.random.cat/meow`).then(function(res) {
		console.log(res.text);
		var str = replaceAll(res.text.substring(9, res.text.length-2), "/", "");
		console.log(str);
		
		let catembed = new Discord.RichEmbed()
		.setColor("#ff9900")
		.setImage(str);
	
		message.channel.send(catembed);
    });
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports.help = {
	name: "cat"
}