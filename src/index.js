import { startWhatsApp } from "./whatsapp/connection.js";
import { handleMenu } from "./bot/flows/menu.js";
import { logger } from "./utils/logger.js";

process.on('unhandledRejection', (err)=>{
    logger.error({err}, 'unhandledRejection (rede de segurança')
})

process.on('uncaughtException', (err)=>{
    logger.fatal({err}, 'uncaughtException, encerrando');
    process.exit(1)
})

const esperar = (ms) => new Promise((resolve)=> setTimeout(resolve, ms))

async function handleMessage(sock, msg){

    const jid = msg.key.remoteJid

    if(jid === "status@broadcast" || jid.endsWith('@g.us')) return;

    const texto = msg.message?.conversation ?? msg.message?.extendedTextMessage?.text ?? '(sem texto)'
    logger.info({jid, texto}, 'Mensagem recebida')

    const resposta = handleMenu(texto)

    await sock.sendPresenceUpdate('composing', jid)
    await esperar(1000 + Math.random() * 1500)
    await sock.sendMessage(jid, {text: resposta})
    await sock.sendPresenceUpdate('paused', jid)
}

startWhatsApp({onMessage: handleMessage}).catch((err)=>{
    logger.fatal({err}, 'Falha ao iniciar')
    process.exit(1)
})