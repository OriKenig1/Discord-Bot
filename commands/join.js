const Discord = require("discord.js");
const gatherFunctions = require("./gather.js");

module.exports.run = async (bot, message, args) => {
	
	gatherFunctions.joinGather(message);
	
}

module.exports.help = {
	name: "join"
}