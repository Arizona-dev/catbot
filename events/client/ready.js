const roleClaim = require("./roleClaim");
const memberCount = require("./memberCount");
const leveling = require("./leveling");
const verificationChannels = require("./verificationChannels");
const deleteInvite = require("./deleteInvite");
const messageLogs = require("./messageLogs");
const raid = require("./raid");
const lightMention = require("./lightMention");
const roles = require("./roles");
const inviteLogger = require("./inviteLogger");

module.exports = (client) => {

    memberCount(client);
    roleClaim(client);
    leveling(client);
    verificationChannels(client);
    deleteInvite(client);
    messageLogs(client);
    raid(client);
    // lightMention(client);
    roles(client);
    inviteLogger(client);
}
