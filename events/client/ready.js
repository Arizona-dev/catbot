const roleClaim = require("./roleClaim");
const memberCount = require("./memberCount");
const leveling = require("./leveling");
const verificationChannels = require("./verificationChannels");
const deleteInvite = require("./deleteInvite");

module.exports = client => {
    client.user.setPresence({ activity: { name: 'toutes vos requêtes', type: 'LISTENING' } });

    memberCount(client);
    roleClaim(client);
    leveling(client);
    verificationChannels(client);
    deleteInvite(client);
}
