module.exports.run = async (client, message, args) => {
    if (isNaN(args[0]) || args[0] < 1 || args[0] > 500)
        return message.reply('Entrez un nombre entre 1 and 500');

    const toDelete = (args[0] <= 100 ? args[0] : args[0] / 100);
    const messages = await message.channel.messages.fetch({
        limit: Math.min(args[0], 100),
        before: message.id
    });

    await message.channel.bulkDelete(messages);

    const msg = await message.channel.send(`${args[0]} messages ont été supprimés.`);

    if (args[0] > 100) {
        let nb = toDelete * 100;
        for (const i = 0; nb > i; nb--) {
            setTimeout(() => {
                message.delete();
            }, 2000);
        }
        setTimeout(() => {
            msg.delete();
        }, 2000);
    } else {
        setTimeout(() => {
            message.delete();
            msg.delete();
        }, 2000);
    }
};

module.exports.help = {
    name: "clean",
    aliases: ['clear', 'c'],
    category: 'mods',
    description: "Clean les messages de moins de 14 jours, entre 1 et 500",
    cooldown: 0,
    usage: '<nb_message>',
    permissions: false,
    isMod: true,
    isUserAdmin: false,
    args: true
};