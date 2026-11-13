import { EventEmitter } from "node:events";

const sock = new EventEmitter();

sock.on("mensagem", async (texto) => {
  try{
        console.log("Listener 1 recebeu:", texto)
        throw new Error("Conexão Falhou")
        
  } catch(err){
       console.log("Mensagem:", err.message)
  }
});

sock.on("mensagem", (texto) => {
  console.log("Listener 2 recebeu:", texto);
});

sock.emit("mensagem", "oi");
console.log("depois do emit");