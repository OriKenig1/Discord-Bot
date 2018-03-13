const Discord = require("discord.js");
var bot = new Discord.Client();
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCt5NL8NA9wZgiA4zWKmy3WsrSkKD210zU');

const fs = require('fs');
const gatherFunctions = require("./commands/gather.js");

bot.commands = new Discord.Collection();

var globalChannel;
var count = 0;

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
q
var fortunes = ["Gnar!", "Shubbanuffa", "Vimaga", "Nakotak", "Kshaa", "Vigishu!", "Wap!", "Hwa!", "Vrooboo", "Raag!", "Wabbo!"];

bot.on("ready", function() {
    console.log("Gnar Bot, ONLINE");
    bot.user.setGame('EGO VEGO')
	gatherFunctions.resetGather(false, null);
	checkPlaylist(false);
});

bot.on("message", async message => {
	
	if(globalChannel == null && message.channel.name == "general")
		globalChannel = message.channel;
	
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
				+ "\n" + "~join - join an open gather"
				+ "\n" + "~leave - leave the gather"
				+ "\n" + "~dog - get a random doggy picture");
                .setColor('ORANGE');
                message.channel.send(embed);
            break;
        default:
            message.channel.send("I don't know this command ;-;");
    }
});

function checkPlaylist(post){
	var name = "Synapse";
	console.log("Checking " + name + " playlist...");
	youtube.getPlaylist('https://www.youtube.com/playlist?list=PLVGT_7RQui0EUJUKxqJbeGsFlzZWCXiz7')
	.then(playlist => {
		playlist.getVideos()
        .then(videos => {
			console.log("Results: " + videos.length + " | " + count);
			if(videos.length > count){
				if(post)
					globalChannel.send("**A new " + name + " video is up!** \n" + videos[0].shortURL);
				count = videos.length;
			}
        }).catch(console.log);
    })
    .catch(console.log);
}

bot.login(TOKEN);

// https://www.youtube.com/playlist?list=PLVGT_7RQui0EUJUKxqJbeGsFlzZWCXiz7 <- Synapse
// https://www.youtube.com/playlist?list=PLoBYMdEd0YmXY9Oj7etlb9CNFCfD42GIl <- NA LCS
// To keep bot awake
setInterval(() => {
	checkPlaylist(true);
  }, 900000);
  
  
  /*
	fs.readFile('./tmp/playlistSizeTEMP', function(err, prevCount) {
		youtube.getPlaylist('https://www.youtube.com/playlist?list=PLoBYMdEd0YmXY9Oj7etlb9CNFCfD42GIl')
		.then(playlist => {
			playlist.getVideos()
            .then(videos => {
				console.log("Vars: " + videos.length + " | " + prevCount);
				if(videos.length > prevCount){
					globalChannel.send("**A new NA LCS video is up!** \n" + videos[0].shortURL);
					fs.writeFile('tmp/playlistSizeTEMP', prevCount++, function (err) {
						if (err) throw err;
					});
				}
            }).catch(console.log);
    })
    .catch(console.log);		
	});
	*/