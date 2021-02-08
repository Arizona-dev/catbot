const roleClaim = require("./roleClaim");
const memberCount = require("./memberCount");
const leveling = require("./leveling");
const verificationChannels = require("./verificationChannels");
const deleteInvite = require("./deleteInvite");
const messageLogs = require("./messageLogs");
const sabrina = require("./sabrina");
const lightMention = require("./lightMention");
const roles = require("./roles");

module.exports = (client) => {
    client.user.setPresence({ activity: { name: 'toutes vos requêtes', type: 'LISTENING' } });

    memberCount(client);
    roleClaim(client);
    leveling(client);
    verificationChannels(client);
    deleteInvite(client);
    messageLogs(client);
    sabrina(client);
    lightMention(client);
    roles(client);
}
