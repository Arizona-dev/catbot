module.exports.run = async (client, message, args) => {
    if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
        return message.reply('choose a number between 1 and 100');

    const messages = await message.channel.messages.fetch({
        limit: Math.min(args[0], 100),
        before: message.id
    });

    await message.channel.bulkDelete(messages);

    const msg = await message.channel.send(`${args[0]} messages has been deleted.`);

    setTimeout(() => {
        message.delete();
        msg.delete();
    }, 2000);
};

module.exports.help = {
    name: "clean",
    aliases: ['clear'],
    category: 'mods',
    description: "Cleans a set number of messages, between 1 and 100",
    cooldown: 10,
    usage: '<nb_message>',
    permissions: true,
    isUserAdmin: false,
    args: true
};