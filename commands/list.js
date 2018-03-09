const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	gatherFunctions.listGather(message);
	
}

module.exports.help = {
	name: "list"
}