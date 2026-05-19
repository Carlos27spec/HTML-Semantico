 const nome = document.getElementById("Nome");
 const ingredientes = document.getElementById("Ingredientes");
 const avaliacao = document.getElementById("Avaliação");
 const categoria = document.getElementById("Categoria");
 const image = document.getElementById("Comida")


// Variável global para guardar as receitas vindas da API
let listaReceitas = [];

// Busca os dados da API e salva na variável global
async function getDados(receita) {
    let dadosID
    if(isNaN(receita)){
    dadosID = await(await fetch(`https://dummyjson.com/recipes/name=${receita}`)).json();
    listaReceitas = dadosID.recipes;
    } else {
    dadosID = await(await fetch(`https://dummyjson.com/recipes/id=${receita}`)).json();
    listaReceitas = dadosID.recipes;
    }
}

function cardapio() {
    event.preventDefault();

    let pedidoDigitado = document.getElementById("Receita").value;
    getDados(pedidoDigitado);

    nome.textContent = `Nome: ${listaReceitas.nome}`;

    // if (receitaEncontrada) {
    //     document.getElementById("Nome").innerText = receitaEncontrada.name;
    //     document.getElementById("Ingredientes").innerText = receitaEncontrada.ingredients.join("\n");
    //     document.getElementById("Avaliação").innerText = receitaEncontrada.rating;
    //     document.getElementById("Categoria").innerText = receitaEncontrada.mealType;
    //     image.src = receitaEncontrada.image;
    //     image.style.display = "block";
    // } else {
    //     document.getElementById("Nome").innerText = "Receita não encontrada";
    //     document.getElementById("Nome").innerText = "Receita não encontrada";
    //     document.getElementById("Ingredientes").innerText = "";
    //     document.getElementById("Avaliação").innerText = "";
    //     document.getElementById("Categoria").innerText = "";
    //     image.src = "";
    //     image.style.display = "none";
    // }
}

