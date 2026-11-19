import db from "../src/database/connection.js"

db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL UNIQUE,
        categoria TEXT NOT NULL,
        preco REAL NOT NULL
)
`)


const inserir = db.prepare(
    'INSERT OR IGNORE INTO products (nome, categoria, preco) VALUES (?, ?, ?)'
)

inserir.run("Perfume Teste Masculino", 'masculino', 129.9)
inserir.run('Perfume Teste Feminino', 'feminino', 149.9)

const todos = db.prepare('SELECT * FROM products').all()
console.log(todos)