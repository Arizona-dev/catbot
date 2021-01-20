module.exports = client => {
    client.user.setPresence({ activity: { name: 'toutes vos requêtes', type: 'LISTENING' } })
}