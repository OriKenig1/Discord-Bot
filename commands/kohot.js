const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	let Admin = message.guild.roles.find("name", "♛ Administrator ♛");
	let Staff = message.guild.roles.find("name", "☄ MGC Staff");
	var roles = message.member.roles;
	if(roles.has(Admin.id) || roles.has(Staff.id))
		gatherFunctions.postKohot(message);
	
}

module.exports.help = {
	name: "kohot"
}