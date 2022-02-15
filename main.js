const Discord = require("discord.js");
const axios = require('axios');
const prefix = '!';
const keys = ['9562891c4amsh9a064539db06089p1b776ejsncb6d43d48446', 'fef16d103dmsh0da9176e5131c1fp184e26jsn43d209282577', 'deb15e1266mshc2f8ef543bf6f49p1b8ed2jsn70d8218fb9f1', '65345a1123msh11a34e70cfcf07ep19bed9jsn0aa6a5a85366'];
const keytouse = Math.floor(Math.random() * keys.length);


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

const TOKEN = "OTQyNTc2MDY0MzY0OTcwMDY0.YgmgXQ.sDzLhD1NBDrtBMrguv1sbjwULoE"

client.on("ready", () => {
    console.log('ovibot is online!');
});


client.on("messageCreate", (message) => {
    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase();

    if (command === 'search') {
        let termargs = args.join(" ");

        const options = {
            method: 'GET',
            url: 'https://breachdirectory.p.rapidapi.com/',
            params: { func: 'auto', term: termargs },
            headers: {
                'x-rapidapi-host': 'breachdirectory.p.rapidapi.com',
                'x-rapidapi-key': (keytouse, keys[keytouse]),
            }
        };
        message.reply("searching...")
        options.params.term = termargs


        setTimeout(function () {
            axios.request(options).then(function (response) {
                for (let i = 0, l = response.data["result"].length; i < l; i++) {

                    var obj = response.data.result[i].hash;
                    console.log(response.data.result[i].hash);
                }
                options.params.term = obj
                options.params.func = 'dehash'
                setTimeout(function () {
                    axios.request(options).then(function (response2) {
                        for (let i = 0, l = response.data.length; i < l; i++) {

                           
                            console.log(response.data[i].found);
                        }
                        message.reply(termargs + " passwords:" + '`' + JSON.stringify(response2.data.found) + '`');
                    });
                }, 1250);

            }).catch(function (error) {
                message.reply("There was an error!" + '`' + 'Couldnt find user.' + '`');
            });
            }, 1250);



    }


});



client.login(TOKEN);



