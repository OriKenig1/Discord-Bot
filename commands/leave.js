const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	pName = "<@" + message.author.id + ">";
	gatherFunctions.removeGather(message, null, pName);
}

module.exports.help = {
	name: "leave"
}