const getMessageCaption = (msg) => ( msg.message?.conversation || msg.message?.extendedTextMessage?.text || "" );

module.exports = getMessageCaption
