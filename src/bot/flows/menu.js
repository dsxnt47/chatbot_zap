
export const MENU_TEXT = `Olá! Bem vindos
Escolha uma opção:


1. Catálogo
2. Rastrear pedido
3. Falar com atendente`


export function handleMenu(texto){
    const opcao = texto.trim().toLowerCase();


    switch(opcao){
        case '1':
            return 'Catálogo em breve!';
        case '2':
            return 'Rastreio em breve!';
        case '3':
            return 'Em breve você falará com um atendente!';
        default:
            return MENU_TEXT
    }
}