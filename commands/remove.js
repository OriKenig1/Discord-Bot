const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	gatherFunctions.removeGather(message, args);
	
}

module.exports.help = {
	name: "remove"
}