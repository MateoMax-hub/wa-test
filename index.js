const express = require('express');
const whatsapp = require("wa-multi-session");
const getNumberFromJid = require('./src/helper/getNumberFromJid');
const normalizeString = require('./src/helper/normalizeString');
const DICTIONARY = require('./src/constants/dictionary');
const getMessageCaption = require('./src/helper/getMessageCaption');

const app = express();

app.set('port', 4000);

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use('/api', require('./src/routes/api'));

app.listen(app.get('port'), () => {
    console.log('Servidor Funcionando');
});

whatsapp.onConnected((session) => {
    console.log("connected => ", session);
});

whatsapp.onDisconnected((session) => {
    console.log("disconnected => ", session);
});

whatsapp.onConnecting((session) => {
    console.log("connecting => ", session);
});

whatsapp.onMessageReceived(async (msg) => {
    const phoneNumber = getNumberFromJid(msg.key?.remoteJid)
    if (msg.message?.senderKeyDistributionMessage?.groupId || msg.key?.participant || phoneNumber === '5493816814643') return
    console.log(`New Message =>`, msg);
    const textraw = getMessageCaption(msg).toLowerCase()
    const text = normalizeString(textraw)
    if (DICTIONARY[text]) {
        await whatsapp.sendTextMessage({
            sessionId: "qeso", 
            to: phoneNumber,
            text: `${DICTIONARY[text]}`,
        });
    }
});

whatsapp.loadSessionsFromStorage();
