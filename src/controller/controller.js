const whatsapp = require("wa-multi-session");
const { toDataURL } = require('qrcode')

const registerSession = async (req, res) => {
    try {
        const scan = true;
        const sessionName = 'qeso';
        if (!sessionName) {
          throw new Error("Bad Request");
        }
        whatsapp.onQRUpdated(async (data) => {
          if (res && !res.headersSent) {
            const qr = await toDataURL(data.qr);
            if (scan && data.sessionId == sessionName) {
              res.json({ qr: qr });
            } else {
              res.status(200).json(
                {
                  qr: qr,
                }
              );
            }
          }
        });
        await whatsapp.startSession(sessionName, { printQR: true });
      } catch (error) {
        console.log(error);
      }
}

const sendMsg = async (req, res) => {
    try {
        await whatsapp.sendTextMessage({
            sessionId: "qeso",
            to: req.body.number,
            text: req.body.msg || '',
        });
        res.send('ola')
    } catch (error) {
        console.log('sendMsgError', error)
        res.send('sendMsgError')
    }
}

const getSessions = async (req, res) => {
    try {
        const sessions = await whatsapp.getAllSession();
        res.json({ sessions })
    } catch (error) {
        console.log('getSessionsError', error)
    }
}

module.exports = {
    getSessions,
    sendMsg,
    registerSession,
}
