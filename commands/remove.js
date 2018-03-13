const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	let Admin = message.guild.roles.find("name", "♛ Administrator ♛");
	var roles = message.member.roles;
	if(roles.has(Admin.id)){
		if(!args[1]){
			message.channel.send("The command is: ~remove [number]");
			return;
		}
		gatherFunctions.removeGather(message, args[1], null);
	}
}

module.exports.help = {
	name: "remove"
}