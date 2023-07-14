const express = require('express');
const whatsapp = require("wa-multi-session");

const app = express();

app.set('port', 4000);
// app.use(cors());

//Middlewares
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use('/api', require('./api'));

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
    console.log(`New Message =>`, msg);
    const getNumber = (jid) => {
        const number = jid.split('@')[0]
        return number || ''
    }
    if (msg.message?.senderKeyDistributionMessage?.groupId || msg.key?.participant) return
    if (msg.message?.extendedTextMessage?.text == 'gato' || msg.message?.extendedTextMessage?.text == 'Gato'
        || msg.message?.conversation == 'gato' || msg.message?.conversation == 'Gato'
    ) {
        await whatsapp.sendTextMessage({
            sessionId: "qeso", // session ID
            to: getNumber(msg.key?.remoteJid), // always add country code (ex: 62)5493816250780
            text: 'tu vieja gata' || '', // message you want to send
        });
    }
});

whatsapp.loadSessionsFromStorage();
