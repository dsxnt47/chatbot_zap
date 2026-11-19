import { handleMenu } from '../src/bot/flows/menu.js';
import { route } from '../src/bot/router.js';

console.log('menu:', handleMenu('oi'));
console.log('route:', route('cliente-teste', 'oi'));