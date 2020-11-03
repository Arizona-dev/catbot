module.exports = client => {
    client.user.setPresence({ activity: { name: 'to all your requests', type: 'LISTENING' } })
}