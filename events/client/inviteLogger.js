module.exports = async (client) => {
  // Initialize the invite cache
  let invites = {};

  // A pretty useful method to create a delay without blocking the whole script.
  const wait = require('util').promisify(setTimeout);

  // "ready" isn't really ready. We need to wait a spell.
  await wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });

  client.on('guildMemberAdd', member => {
    // To compare, we need to load the current invite list.
    member.guild.fetchInvites().then(guildInvites => {
      // This is the *existing* invites for the guild.
      const ei = invites[member.guild.id];
      // Update the cached invites for the guild.
      invites[member.guild.id] = guildInvites;
      // Look through the invites, find the one for which the uses went up.
      const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
      // This is just to simplify the message being sent below (inviter doesn't have a tag property)
      const inviter = client.users.cache.get(invite.inviter.id);
      // Get the log channel (change to your liking)
      console.log(member.guild.channels);
      const logChannel = member.guild.channels.find(channel => channel.name === "invite-logs");
      // A real basic message with the information we need. 
      logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
    });
  });
}
