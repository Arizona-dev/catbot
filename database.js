const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = process.env.DB;
const db_client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true , keepAlive: 1 });

const getRandomQuestion = async () => {
    let randomQuestion = "";
    if (!db_client.isConnected()) {
    await db_client.connect()
        .then(async () => {
        const database = db_client.db('catbot');
        const collection = database.collection('wyr');
        const n = await collection.countDocuments();
        const r = Math.floor(Math.random() * n );
        const query = { question_id: r };
        randomQuestion = await collection.findOne(query);
        await db_client.close();
        })
        .catch(err => console.log(err));
    } else {
    await db_client.connect()
        .then(async () => {
            const database = db_client.db('catbot');
            const collection = database.collection('wyr');
            const n = await collection.countDocuments();
            const r = Math.floor(Math.random() * n );
            const query = { question_id: r };
            randomQuestion = await collection.findOne(query);
            await db_client.close();
        })
        .catch(err => console.log(err));
    }
    return randomQuestion;
}

module.exports = {
    getRandomQuestion,
}