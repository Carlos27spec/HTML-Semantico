// Variável global para guardar as receitas vindas da API
let listaReceitas = [];

// Busca os dados da API e salva na variável global
async function getDados(url) {
    const dados = await (await fetch(url)).json();
    listaReceitas = dados.recipes; 
}

getDados("https://dummyjson.com/recipes/1")
getDados("https://dummyjson.com/recipes/search?q=Margherita");

function cardapio() {

    let pedidoDigitado = document.getElementById("Receita").value;

    event.preventDefault();

    let receitaEncontrada = listaReceitas.find(
        p => p.name.toLowerCase() === pedidoDigitado.toLowerCase()
    );


    let image = document.getElementById("Comida");

    if (receitaEncontrada) {
        document.getElementById("Nome").innerText = receitaEncontrada.id;
        document.getElementById("Nome").innerText = receitaEncontrada.name;
        document.getElementById("Ingredientes").innerText = receitaEncontrada.ingredients.join("\n");
        document.getElementById("Avaliação").innerText = receitaEncontrada.rating;
        document.getElementById("Categoria").innerText = receitaEncontrada.mealType;
        image.src = receitaEncontrada.image;
        image.style.display = "block";
    } else {
        document.getElementById("Nome").innerText = "Receita não encontrada";
        document.getElementById("Nome").innerText = "Receita não encontrada";
        document.getElementById("Ingredientes").innerText = "";
        document.getElementById("Avaliação").innerText = "";
        document.getElementById("Categoria").innerText = "";
        image.src = "";
        image.style.display = "none";
    }
}
