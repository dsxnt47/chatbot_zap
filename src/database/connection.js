import Database from 'better-sqlite3'

const db = new Database('data/bot.sqlite3')
db.pragma('journal_mode = WAL')

export default db