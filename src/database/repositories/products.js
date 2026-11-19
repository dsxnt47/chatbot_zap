import db from '../connection.js'

export function listByCategory(categoria){
    return db.prepare('SELECT id, nome, preco FROM products WHERE categora = ? ORDER BY nome').all(categoria)
}

export function findById(id){
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id)
}

