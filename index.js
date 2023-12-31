const express = require('express');
const whatsapp = require("wa-multi-session");
const getNumberFromJid = require('./src/helper/getNumberFromJid');
const normalizeString = require('./src/helper/normalizeString');
const DICTIONARY = require('./src/constants/dictionary');
const getMessageCaption = require('./src/helper/getMessageCaption');
const ServerSocket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new ServerSocket.Server(server, { path: '/socket/', cors: { origin: '*' } });
app.set('port', 4000);

io.on("connection", (socket) => {
    whatsapp.onLabelAssociation((data) => {
        socket.emit('label-association', data)
    })
    whatsapp.onLabelEdit((data) => {
        socket.emit('label-edit', data)
    })
});

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use('/api', require('./src/routes/api'));

server.listen(app.get('port'), () => {
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
    if (msg.message?.senderKeyDistributionMessage?.groupId || msg.key?.participant || msg.pushName === '.w' || msg.key.fromMe) return
    // console.log(`New Message =>`, msg);
    const textraw = getMessageCaption(msg).toLowerCase()
    const text = normalizeString(textraw)
    if (DICTIONARY[text]) {
        await whatsapp.sendTextMessage({
            sessionId: "qeso", 
            to: getNumberFromJid(msg.key?.remoteJid),
            text: `${DICTIONARY[text]}`,
        });
    }
});

whatsapp.loadSessionsFromStorage();
