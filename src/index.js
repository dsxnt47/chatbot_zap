import { startWhatsApp } from "./whatsapp/connection.js";

import { logger } from "./utils/logger.js";

process.on('unhandledRejection', (err)=>{
    logger.error({err}, 'unhandledRejection (rede de segurança')
})

process.on('uncaughtException', (err)=>{
    logger.fatal({err}, 'uncaughtException, encerrando');
    process.exit(1)
})

async function handleMessage(sock, msg){

    const jid = msg.key.remoteJid

    if(jid === "status@broadcast" || jid.endsWith('@g.us')) return;

    const texto = msg.message?.conversation ?? msg.message?.extendedTextMessage?.text ?? '(sem texto)'
    logger.info({jid, texto}, 'Mensagem recebida')

    await sock.sendMessage(jid, {text: "Olá! Recebi sua mensagem 👋"})
}

startWhatsApp({onMessage: handleMessage}).catch((err)=>{
    logger.fatal({err}, 'Falha ao iniciar')
    process.exit(1)
})