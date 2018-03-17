const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	
	superagent.get(`http://aws.random.cat/meow`).then(function(res) {
		
		console.log(res.text);
		var str = res.text.substring(9, res.text.length-2).split("/").join("");
		console.log(str);
		
		let {body} = superagent.get(str).then(function(res) {
			
			console.log(res.url);
			console.log(body.url);
			
			let catembed = new Discord.RichEmbed()
			.setColor("#ff9900")
			.setImage(res.url);
	
			message.channel.send(catembed);
		});
	});
}

module.exports.help = {
	name: "cat"
}