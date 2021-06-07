const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");//lrowsxrd

client.on("ready", ()=>console.log("READY"));//lrowsxrd

const jointocreate = require("./jointocreate");//lrowsxrd
jointocreate(client);


client.login(config.TOKEN);