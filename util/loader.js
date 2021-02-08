const fs = require('fs');
const { logs } = require('./logs.js');

const loadBot = (client) => {

    logs('Logs folder has been created');

    let dircommands = "./commands/";
    fs.readdirSync(dircommands).forEach(dirs => {
        const cmds = fs.readdirSync(`${dircommands}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of cmds) {
            const cmd = require(`../${dircommands}/${dirs}/${file}`);
            client.commands.set(cmd.help.name, cmd);
        }

        logs(`${dirs}: ${cmds.length} commande(s) chargées`);
        console.log(`${dirs}: ${cmds.length} commande(s) chargées`);
    })

    let direvents = "./events/";
    fs.readdirSync(direvents).forEach(dirs => {
        const events = fs.readdirSync(`${direvents}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const etv = require(`../${direvents}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, etv.bind(null, client));
        }
        logs(`${dirs}: ${events.length} évenement(s) chargés`);
        console.log(`${dirs}: ${events.length} évenement(s) chargés`);
    })
}

module.exports = {
    loadBot,
}