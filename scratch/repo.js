import { findById, listByCategory } from "../src/database/repositories/products.js";


const produto = findById(1)
if (!produto){
    console.log("Produto não encontrado")
}
console.log(produto.nome)
