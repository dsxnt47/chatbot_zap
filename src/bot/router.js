import { getSession } from './sessionStore.js';
import { handleMenu, MENU_TEXT } from './flows/menu.js';
import { listByCategory } from '../database/repositories/products.js';

const CATEGORIAS = { '1': 'masculino', '2': 'feminino' };
const TEXTO_CATEGORIAS = 'Escolha a categoria:\n1 - Masculino\n2 - Feminino\n0 - Voltar';

function formatarLista(produtos) {
  return produtos
    .map((p, i) => `${i + 1} - ${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})`)
    .join('\n');
}

export function route(jid, texto) {
  const sessao = getSession(jid);
  const entrada = texto.trim().toLowerCase();

  if (sessao.etapa === 'categoria') {
    if (entrada === '0') {
      sessao.etapa = 'menu';
      return MENU_TEXT;
    }
    const categoria = CATEGORIAS[entrada];
    if (!categoria) return 'Digite 1, 2 ou 0 para voltar.';

    const produtos = listByCategory(categoria);
    if (produtos.length === 0) return 'Ainda não há perfumes nessa categoria. Digite 0 para voltar.';

    sessao.produtos = produtos;
    sessao.etapa = 'lista';
    return `${formatarLista(produtos)}\n\n0 - Voltar`;
  }

  if (sessao.etapa === 'lista') {
    if (entrada === '0') {
      sessao.etapa = 'categoria';
      return TEXTO_CATEGORIAS;
    }
  
    return 'Em breve!';
  }


  if (entrada === '1') {
    sessao.etapa = 'categoria';
    return TEXTO_CATEGORIAS;
  }
  return handleMenu(texto);
}