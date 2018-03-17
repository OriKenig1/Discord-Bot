const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	let {body} = await superagent
	.get(`http://aws.random.cat/meow`);
	
	console.log(body.get("file"));
	
	let dogembed = new Discord.RichEmbed()
	.setColor("#ff9900")
	.setImage(body);
	
	
	
	message.channel.send(dogembed);
}

module.exports.help = {
	name: "cat"
}