    //Modules-------
const fs = require('fs')//fs modules to check and read file
const { Webhook, MessageBuilder } = require('discord-webhook-node');//webhook modules v2
var AdmZip = require('adm-zip');//modules can create new zip 
var zip = new AdmZip(); // creating archives from adm-zip modules
var prompt = require('prompt-sync')(); //prompt sync to input req
const chalk = require('chalk'); //give you color.
const title = require("node-bash-title"); //add package name title
////////////////////////////////////////////////////////////////////////////////

//title package
title("AutoBackup Folder | ©MadepanHD");

console.log('===============================================================================',
            '\nhttps://discord.com/api/webhooks/(api)',
            chalk.yellow('\ndont write contains HTTPS, just only the API!'),
            '\n===============================================================================\n',)
var webhookstring = prompt('['+ chalk.green("INPUT") +'] Input WebhookApi: ');
console.clear();
console.log('===============================================================================',
            '\nCount Millisecond in : http://www.kylesconverter.com/time/hours-to-milliseconds',
            '\n===============================================================================\n',)
const timestring = prompt('['+ chalk.green("INPUT") +'] Input Time Backup: ');
console.clear();
console.log('===============================================================================',
            '\nMake Sure You put this Exe at the same folder with your GTPS Folder.',
            '\nTutorial Run Exe : Soon',
            '\n===============================================================================\n',)
var foldername = prompt('['+ chalk.green("INPUT") +'] Input Name Folder: ');
console.clear();
                                                                                        //aa
console.log('=============================Automatic Backup Running=============================',
            chalk.yellow(`\nWebhookApi : https://discord.com/api/webhooks/${webhookstring}`),
            chalk.yellow(`\n1 Backup for : ${timestring}`),
            chalk.yellow(`\nFolder Name to Backup : ${foldername}`),
            '\n==================================================================================\n');

//webhook api goblok :v
const hook = new Webhook({
    url: `https://discord.com/api/webhooks/${webhookstring}`,
    //If throwErrors is set to false, no errors will be thrown if there is an error sending
    throwErrors: true,
    //retryOnLimit gives you the option to not attempt to send the message again if rate limited
    retryOnLimit: false
});

function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (hours < 10) {
        hours = "0" + hours
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += "(" + hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM)"
    } else {
        str += "AM)"
    }
    return str;
}

//webhooksend funcation
async function webhooksend() {
    try {
        const embed = new MessageBuilder()
        .setTitle("Automatic Backup On : "+displayTime() +"")
        .setColor('RANDOM')
        .setTimestamp();
        hook.send(embed);
        hook.sendFile(`./backup.zip`);
        console.log("["+ chalk.green("SYSTEM") +"] Successfully Backup On Time : ",displayTime())
    } catch(error) {
        console.log("["+ chalk.red("ERROR") +"] ",error)
    }
}

async function startbackup() {
    zip.writeZip(`backup.zip`);
    zip.addLocalFolder(`./${foldername}`, "Saved");

    setTimeout(webhooksend, 10000);
}

setInterval(startbackup, timestring);