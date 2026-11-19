const sessoes =  new Map()

export function getSession(jid){
    if(!sessoes.has(jid)){
        sessoes.set(jid, {etapa: 'menu'})
    }

    return sessoes.get(jid);
}

