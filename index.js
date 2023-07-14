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
    function normalizeString(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    if (msg.message?.senderKeyDistributionMessage?.groupId || msg.key?.participant) return
    const textraw = msg.message?.extendedTextMessage?.text?.toLowerCase() ||msg.message?.conversation?.toLowerCase()
    const text = normalizeString(textraw)
    const insults = {
        gato: 'gata',
        puto: 'puta',
        gay: 'gei',
        gei: 'gei',
        gai: 'gei',
        marica: 'marica',
        pete: 'me hace uno de esos',
        trolo: 'trola',
        tragaleche: 'me traga la leche',
        boludo: 'puto',
        pelotudo: 'pelotudo',
        '!gracias': 'De nada tenga buen dia :D',
        idiota: 'manga de falto de cromosomas',
        imbecil: 'manga de falto de cromosomas',
        estupido: 'manga de falto de cromosomas',
        ridiculo: 'manga de falto de cromosomas',
    }
    if (insults[text]) {
        await whatsapp.sendTextMessage({
            sessionId: "qeso", 
            to: getNumber(msg.key?.remoteJid),
            text: `tu vieja ${insults[text]}`,
        });
    }
});

whatsapp.loadSessionsFromStorage();
