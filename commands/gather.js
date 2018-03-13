const Discord = require("discord.js");

// Unranked, Bronze, Silver, Gold, Platinum, Diamond 5, Diamond 4, Diamond 3, Diamond 2, Diamond 1

var gather;
var gatherSize;
var players;
var members;

var members_rank;
var ranks; 
var Blue;
var Red;
var Red_Names;
var Blue_Names;
var Red_IDS;
var Blue_IDS;
module.exports.run = async (bot, message, args) => {
	
	let Admin = message.guild.roles.find("name", "♛ Administrator ♛");
	var roles = message.member.roles;
	if(roles.has(Admin.id))
		this.resetGather(true, message);

}

module.exports.joinGather = function joinGather(message){
	var roles = message.member.roles;
    pName = "<@" + message.author.id + ">";
	
    if(!gather){ // Gather is open?
		message.channel.send("Gather isn't open at the moment");  
		return;
	}
	
    if(gatherSize == 10) return; // Gather is full?

	if(players.indexOf(pName) > -1) return; // Already in gather ?
	
    gatherSize++; // Increase gather current size

    players.push(pName); // Add player name
    members.push(message.member); // Add player ID
	message.channel.send(pName + " joined the gather (**" + gatherSize + "**/10)"); 
	
    if(gatherSize == 10)
		startGather(message);
};

module.exports.removeGather = function removeGather(message, number, name){

	var numRem;
	var nameRem;
	if(number != null){
		numRem = number-1;
		nameRem = players[numRem];
		if(typeof nameRem == 'undefined'){
			this.listGather(message);
			return;
		}
	}else if(name != null){
		numRem = players.indexOf(name);
		if(numRem == -1){
			this.listGather(message);
			return;
		}
		nameRem = players[numRem];
	}else
		return;
	
    var tempPlayers = [];
    players[numRem] = null;
    for(var i = 0; i < 10; i++){
		if(players[i] != null){
			tempPlayers[j] = players[i];
            j++;
        }     
    }
    players = [];
    for(var i = 0; i < tempPlayers.length; i++)
        players[i] = tempPlayers[i];
	
	
    j = 0;
    var memberRem = members[numRem];
    var tempPlayers = [];
    members[numRem] = null;
    for(var i = 0; i < 10; i++){
		if(members[i] != null){
			tempPlayers[j] = members[i];
			j++;
		}               
    }
    members = [];
    for(var i = 0; i < tempPlayers.length; i++)
        members[i] = tempPlayers[i];

    gatherSize--;
    message.channel.send(nameRem + " has been removed from the gather");
};

module.exports.listGather = function listGather(message){
	var playersPrint = ['-', '-', '-','-','-','-', '-', '-','-','-'];
    for(var i = 0; i < 10; i++){
        if(players[i] != null)
            playersPrint[i] = players[i];
        }
    var placesLeft = 10 - players.length;
    var embed = new Discord.RichEmbed()
        .addField("Players",
        playersPrint[0] 
        + "\n\n" + playersPrint[1] 
        + "\n\n" + playersPrint[2] 
        + "\n\n" + playersPrint[3] 
        + "\n\n" + playersPrint[4], true)
        .addField(placesLeft + " left",                
        "\n\n" + playersPrint[5] 
        + "\n\n" + playersPrint[6]
        + "\n\n" + playersPrint[7] 
        + "\n\n" + playersPrint[8]
        + "\n\n" + playersPrint[9], true)
       .setColor('CYAN');
    message.channel.send(embed);
};

module.exports.resetGather = function resetGather(open, message){
    gatherSize = 0;
    gather = open;
    players = [];
    members = []

    members_rank = [];
    ranks = [0, 0, 0, 0 ,0, 0, 0, 0 ,0 ,0];
    Blue = [];
    Red = [];
    Red_Names = [];
    Blue_Names = [];
    Red_IDS = [];
    Blue_IDS = [];

	if(open){
		var pName = "<@" + message.author.id + ">";
		message.channel.send(pName + " has opend a gather, to join type **~join**");    
	}
};

function startGather(message){
	//message.channel.send("**The gather is ready!**");
	var embed = new Discord.RichEmbed()
        .addField("-",
        players[0] 
        + "\n\n" + players[1] 
        + "\n\n" + players[2] 
        + "\n\n" + players[3] 
        + "\n\n" + players[4], true)
        .addField("-",                
        "\n\n" + players[5] 
        + "\n\n" + players[6]
        + "\n\n" + players[7] 
        + "\n\n" + players[8]
        + "\n\n" + players[9], true)
        .setColor('CYAN');
    //message.channel.send(embed);

    message.channel.send("**Organizing teams ...**"); 

    getRoles(message);
    console.log(members_rank);
    console.log(ranks);
		
    calculateAmount();
    console.log(Blue);
    console.log(Red);
		
    organizeNames();
    console.log(Blue_Names);
    console.log(Red_Names);

	postKohot(message);
	
	// Save data after finalizing
	//module.exports.resetGather(false, message);
}
			

module.exports.postKohot = function postKohot(message){
    embedB = new Discord.RichEmbed()
        .addField("Blue Team",
        Blue_Names[0]
        + "\n\n" + Blue_Names[1]
        + "\n\n" + Blue_Names[2]
        + "\n\n" + Blue_Names[3]
        + "\n\n" + Blue_Names[4], true)
        .setColor('BLUE')
        .addField("Ranks",
        rank_to_string(Blue_IDS[0])
        + "\n\n" + rank_to_string(Blue_IDS[1])
        + "\n\n" + rank_to_string(Blue_IDS[2])
        + "\n\n" + rank_to_string(Blue_IDS[3])
        + "\n\n" + rank_to_string(Blue_IDS[4]), true);
                

    embedR = new Discord.RichEmbed()
        .addField("Red Team",
        Red_Names[0]
        + "\n\n" + Red_Names[1]
        + "\n\n" + Red_Names[2]
        + "\n\n" + Red_Names[3]
        + "\n\n" + Red_Names[4], true)
        .setColor('RED')
        .addField("Ranks",
        rank_to_string(Red_IDS[0])
        + "\n\n" + rank_to_string(Red_IDS[1])
        + "\n\n" + rank_to_string(Red_IDS[2])
        + "\n\n" + rank_to_string(Red_IDS[3])
        + "\n\n" + rank_to_string(Red_IDS[4]), true);

	message.channel.send(embedB);
	message.channel.send(embedR);
}
			
function rank_to_string(rank_num){
    if(rank_num == 6)
        return 'Diamond 1';
    if(rank_num == 5.75)
        return 'Diamond 2';
    if(rank_num == 5.5)
        return 'Diamond 3';
    if(rank_num == 5.25)
        return 'Diamond 4';
    if(rank_num == 4.25)
        return 'Diamond 5';
    if(rank_num == 4)
        return 'Platinum';
    if(rank_num == 3)
        return 'Gold';
    if(rank_num == 2)
        return 'Silver';
    if(rank_num == 1)
        return 'Bronze';  
    if(rank_num == 0)
        return 'Unranked'; 
}

function organizeNames(){
    // Red
    for(var i = 0; i < 6; i+= 0.25){
        var rank_lf = Red.pop();
        for(var j = 0; j < members_rank.length; j++){
            if(members_rank[j] == rank_lf){
                Red_IDS.push(members_rank[j]);
                Red_Names.push(players[j]);
                members_rank[j]+=10;
                j = members_rank.length;
            }
        }
    }
    // Blue
    for(var i = 0; i < 6; i+= 0.25){
        var rank_lf = Blue.pop();
        for(var j = 0; j < members_rank.length; j++){
            if(members_rank[j] == rank_lf){
                Blue_IDS.push(members_rank[j]);
                Blue_Names.push(players[j]);
                members_rank[j]+=10;
                j = members_rank.length;
            }
        }
    }
}

function calculateAmount(){   
    while(Red.length + Blue.length < 10){
        if(Red.length > Blue.length){
            var rankToAdd = 0;
            while(ranks[rankToAdd] == 0) rankToAdd++;
            addRank(1, rankToAdd);
        }else if(Red.length < Blue.length){
            var rankToAdd = 0;
            while(ranks[rankToAdd] == 0) rankToAdd++;
            addRank(-1, rankToAdd);
        }else{
            var rankToAdd = 0;
            while(ranks[rankToAdd] == 0) rankToAdd++;
            if(ranks[rankToAdd] == 1){
                if(teamAvg(1) >= teamAvg(-1)) addRank(1, rankToAdd);
                else addRank(-1, rankToAdd);
            }else{
                if(teamAvg(1) >= teamAvg(-1)) addRank(-1, rankToAdd);
                else addRank(1, rankToAdd);
            }
        }
       
    }
}

function addRank(team, rankNumber){
    var toPush = rankNumber;
    if(rankNumber == 5)
        toPush = 4.25;
    else if(rankNumber == 6)
        toPush = 5.25;
    else if(rankNumber == 7)
        toPush = 5.5;
    else if(rankNumber == 8)
        toPush = 5.75;
    else if(rankNumber == 9)
        toPush = 6;
        
    if(team == 1) Blue.push(toPush);
    if(team == -1) Red.push(toPush);
    ranks[rankNumber]--;
}

function teamAvg(team){
    var sum = 0;
    if(team == 1){
        for(var i = 0; i < Blue.length; i++)
            sum +=Blue[i];
        if(Blue.length != 0) sum = sum / Blue.length;
        //console.log("Blue AVG: " + sum);
    }
    else if(team == -1){
        for(var i = 0; i < Red.length; i++)
            sum += Red[i];
        if(Red.length != 0) sum = sum / Red.length;
        //console.log("Red AVG: " + sum);
    }
    
    return sum;
}

function getRoles(message){
    let Diamond1 = message.guild.roles.find("name", "Diamond 1");
    let Diamond2 = message.guild.roles.find("name", "Diamond 2");
    let Diamond3 = message.guild.roles.find("name", "Diamond 3");
    let Diamond4 = message.guild.roles.find("name", "Diamond 4");
    let Diamond5 = message.guild.roles.find("name", "Diamond 5");
    let Platinum = message.guild.roles.find("name", "Platinum");
    let Gold = message.guild.roles.find("name", "Gold");
    let Silver = message.guild.roles.find("name", "Silver");
    let Bronze = message.guild.roles.find("name", "Bronze");
    for(var i = 0; i < members.length; i++){   
        var role = members[i].roles; 
        if(role.has(Diamond1.id)){
           members_rank[i] = 6;
           ranks[9]++;
        } 
        else if(role.has(Diamond2.id)){
           members_rank[i] = 5.75;
           ranks[8]++;
        } 
        else if(role.has(Diamond3.id)){
           members_rank[i] = 5.5;
           ranks[7]++;
        } 
        else if(role.has(Diamond4.id)){
           members_rank[i] = 5.25;
           ranks[6]++; 
        }
        else if(role.has(Diamond5.id)){
           members_rank[i] = 4.25;
           ranks[5]++;
        } 
        else if(role.has(Platinum.id)){
           members_rank[i] = 4;
           ranks[4]++;
        } 
        else if(role.has(Gold.id)){
           members_rank[i] = 3;
           ranks[3]++;
        } 
        else if(role.has(Silver.id)){
           members_rank[i] = 2;
           ranks[2]++;
        } 
        else if(role.has(Bronze.id)){
           members_rank[i] = 1;
           ranks[1]++;
        } 
        else{
           members_rank[i] = 0;
           ranks[0]++;
        } 
    }
    return;
}

module.exports.help = {
	name: "gather"
}