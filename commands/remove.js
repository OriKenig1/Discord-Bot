const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	let Admin = message.guild.roles.find("name", "♛ Administrator ♛");
	var roles = message.member.roles;
	if(roles.has(Admin.id))
		gatherFunctions.removeGather(message, args);
	
}

module.exports.help = {
	name: "remove"
}