const roleClaim = require("./roleClaim");

module.exports = client => {
    client.user.setPresence({ activity: { name: 'toutes vos requêtes', type: 'LISTENING' } });

    const guild = client.guilds.cache.get("753700110864482395");
    setInterval(function () {
       var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
       var memberCountChannel = client.channels.cache.get("802205787132526612");
       memberCountChannel.setName(`------ ${memberCount} Membres ! ------`);
    }, 60000);

    roleClaim(client);
}
