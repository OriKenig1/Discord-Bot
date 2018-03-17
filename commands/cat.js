const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	
	superagent.get(`http://aws.random.cat/meow`).then(function(res) {
		console.log(res.text);
		var str = res.text.substring(9, res.text.length-2).split("/").join("");
		console.log(str);
		
		message.channel.send("s", {
		file: str 
		});
		
    });
}

module.exports.help = {
	name: "cat"
}