import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    extractSyncdPatches,
} from '@whiskeysockets/baileys'

import qrcode from 'qrcode-terminal'
import { logger } from '../utils/logger.js'



const AUTH_DIR = 'auth_info'

let tentativas = 0

export async function startWhatsApp({onMessage}){
    const {state, saveCreds} = await useMultiFileAuthState(AUTH_DIR);

    const sock = makeWASocket({
        auth: state,
        logger: logger.child({module: 'baileys', level: 'warn'})
    })


    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update)=>{
        try{
            const { connection, lastDisconnect, qr} = update;

            if(qr){
                logger.info("Escaneie o QE code com o whatsapp (Aparelhos conectados):")
                qrcode.generate(qr, { smaill: true })
            }

            if(connection === 'open'){
                tentativas = 0,
                logger.info('Conectado ao whatsapp')
            }

            if(connection === 'close'){
                const code = lastDisconnect?.error?.output?.statusCode;

                if(code === DisconnectReason.loggedOut){
                    logger.error("Sessão encerrada pelo celular. Apague auth_info/ e faça login de novo")
                }

                const espera = Math.min(1000*2 ** tentativas, 60_000)
                tentativas++
                logger.warn({code, espera}, "Conexão caiu, reconectando...")
                setTimeout(()=>{
                    startWhatsApp([onMessage]).catch((err)=>
                        logger.error({err}, 'Falha ao reconectar')
                    )
                }, espera)
            }
        }catch(err){
            logger.error({err}, "Erro em connection.update")
    }
    });


    sock.ev.on('messages.upset', async ({messages, type}) =>{
        try{
            if (type !== 'notify') return
            for (const msg of messages){
                if (msg.key.fromMe) continue
                await onMessage(sock, msg)
            }
        } catch(err){
            logger.error({err}, "Erro em messages.upsert")
        }
    })
    return
}
