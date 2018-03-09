const Discord = require("discord.js");
var bot = new Discord.Client();

const fs = require('fs');
const superagent = require("superagent");
const gatherFunctions = require("./commands/gather.js");

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
		console.log("Commands file is empty");
		return;
	}
	
	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
	
});
const TOKEN = process.env.TOKEN;

const express = require('express');
const app = express();

const PREFIX = "~";

var fortunes = ["Gnar!", "Shubbanuffa", "Vimaga", "Nakotak", "Kshaa", "Vigishu!", "Wap!", "Hwa!", "Vrooboo", "Raag!", "Wabbo!"];


set the port of our application
process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000; 

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});



bot.on("ready", function() {
    console.log("Gnar Bot, ONLINE");
    bot.user.setGame('EGO VEGO')
	gatherFunctions.resetGather(false, null);
});

bot.on("message", async message => {
	
	if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");

	let commandfile = bot.commands.get(args[0]);
	if(commandfile){
		commandfile.run(bot, message, args);
		return;
	}
	
    switch (args[0].toLowerCase()){
        case "info":
			let bicon = bot.user.displayAvatarURL;
			let botembed = new Discord.RichEmbed()
			.setColor('ORANGE')
			.setThumbnail(bicon)
			.addField("Bot Name", bot.user.username)
			.addField("Created by", "Kenig");
			
			message.channel.send(botembed);
            break;
        case "ask":
            if(args[1])
                 message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
             else
                message.channel.send("'" + PREFIX + "ask [question]'");
             break;
        case "help":
            var embed = new Discord.RichEmbed()
                .addField("Commands",
                "~ask [question] - ask Gnar a question"
				+ "\n" +
				"~dog - doggy picture")
                .setColor('ORANGE');
                message.channel.send(embed);
            break;
        default:
            message.channel.send("I don't know this command ;-;");
    }
});

bot.login(TOKEN);

// To keep bot awake
setInterval(() => {
    http.get('https://kenig-discord-bot.herokuapp.com/');
  }, 900000);