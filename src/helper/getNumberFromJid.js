const getNumberFromJid = (jid) => {
    const number = jid.split('@')[0]
    return number || ''
}

module.exports = getNumberFromJid
