let listaReceitas = [];

async function getDados(url) {
    const dados = await (await fetch(url)).json();
    listaReceitas = dados.recipes;

    for (let i = 1; i <= 50; i++){
    const dadosEspecifico = await (await fetch(`https://dummyjson.com/recipes/${i}`)).json();
    listaReceitas.push(dadosEspecifico);
}
}

getDados("https://dummyjson.com/recipes/search?q=Margherita");

function cardapio() {
    event.preventDefault();
    let pedidoDigitado = document.getElementById("Receita").value;

    let receitaEncontrada = listaReceitas.find(
        p => p.name.toLowerCase() === pedidoDigitado.toLowerCase()
        || p.id == pedidoDigitado
    );

    let image = document.getElementById("Comida");

    if (receitaEncontrada) {
        document.getElementById("Nome").innerText = receitaEncontrada.name;
        document.getElementById("Ingredientes").innerText = receitaEncontrada.ingredients.join("\n");
        document.getElementById("Avaliação").innerText = receitaEncontrada.rating;
        document.getElementById("Categoria").innerText = receitaEncontrada.mealType;
        image.src = receitaEncontrada.image;
        image.style.display = "block";
    } else {
        document.getElementById("Nome").innerText = "Receita não encontrada";
        document.getElementById("Ingredientes").innerText = "";
        document.getElementById("Avaliação").innerText = "";
        document.getElementById("Categoria").innerText = "";
        image.src = "";
        image.style.display = "none";
    }
}