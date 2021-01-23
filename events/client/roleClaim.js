const roles_1 = require('./Messages/roles_1');

module.exports = (client) => {
    const channelId = '796844120768774154';

    const getEmoji = (emojiName) => {
        const em = client.emojis.cache.find((emoji) => emoji.name === emojiName);
        console.log(em)
    }

    const emojis = {
        '\:male_sign:': 'Homme',
        '802324535033462794': 'Femme'
    }

    const reactions = [];

    let emojiText = 'Réagissez aux réactions qui vous correspondent pour reçevoir le rôle associé.\n\n';
    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];
        emojiText += `${emoji} = ${role}`;
    }

    roles_1(client, channelId, emojiText, reactions);
}