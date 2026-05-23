let listaReceitas = [];
let posicaoAT = 0;

async function getDados(url) {
    const dados = await (await fetch(url)).json();
    listaReceitas = dados.recipes;
    console.log(dados.recipes)

    for (let i = 1; i <= 50; i++){
    const dadosEspecifico = await (await fetch(`https://dummyjson.com/recipes/${i}`)).json();
    listaReceitas.push(dadosEspecifico);
}
}

getDados("https://dummyjson.com/recipes/search?q=");

function Button(Receita) {
    let image = document.getElementById("Comida");
    document.getElementById("Nome").innerText = Receita.name;
    document.getElementById("ID").innerText = Receita.id;
    document.getElementById("Ingredientes").innerText = Receita.ingredients;
    document.getElementById("Avaliacao").innerText = Receita.rating;
    document.getElementById("Categoria").innerText = Receita.mealType;
    image.src = Receita.image;
    image.style.display = "block";
}

function cardapio(event) {
    event.preventDefault();
    let pedidoDigitado = document.getElementById("Receita").value.trim().replace(/\s+/g, " ");

    let receitaEncontrada = listaReceitas.find(
        p => p.name.toLowerCase() === pedidoDigitado.toLowerCase()
        || p.id == pedidoDigitado
    );

    let image = document.getElementById("Comida");

    try {
        if (!receitaEncontrada) {
            throw new Error("Receita não encontrada, Tente Novamente");
        }
    } catch (error) {
        document.getElementById("Nome").innerText = error.message;
        return;
    }
    if (receitaEncontrada) {    
        document.getElementById("Nome").innerText = receitaEncontrada.name;
        document.getElementById("ID").innerText = receitaEncontrada.id
        document.getElementById("Ingredientes").innerText = receitaEncontrada.ingredients.join("\n");
        document.getElementById("Avaliacao").innerText = receitaEncontrada.rating;
        document.getElementById("Categoria").innerText = receitaEncontrada.mealType;
        image.src = receitaEncontrada.image;
        image.style.display = "block";
    }

     posicaoAT = listaReceitas.indexOf(receitaEncontrada);
  exibirReceita(receitaEncontrada);
}

function avancar() {
    if (posicaoAT < listaReceitas.length - 1) {
        posicaoAT++;
    } else {
        posicaoAT = 0;
    }
    Button(listaReceitas[posicaoAT]);
}

function voltar() {
    if (posicaoAT > 0) {
        posicaoAT--;
    } else {
        posicaoAT = listaReceitas.length - 1;
    }
    Button(listaReceitas[posicaoAT]);
}