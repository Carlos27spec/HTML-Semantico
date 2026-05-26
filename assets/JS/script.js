let listaReceitas = [];
let posicaoAT = -1;

async function getDados() {
    const promessas = [];
    for (let i = 1; i <= 50; i++) {
        promessas.push(fetch(`https://dummyjson.com/recipes/${i}`).then(r => r.json()));
    }
    listaReceitas = await Promise.all(promessas);
    console.log("Receitas carregadas:", listaReceitas.length);
}

getDados();


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

    const normalizar = (str) => str.toLowerCase().replace(/\s+/g, "");

    let receitaEncontrada = listaReceitas.find(
        p => normalizar(p.name) === normalizar(pedidoDigitado)
            || p.id == pedidoDigitado
    );

    let image = document.getElementById("Comida");

    try {
        if (!receitaEncontrada) {
            throw new Error("Receita não encontrada, Tente Novamente");
        }
    } catch (error) {
        document.getElementById("Nome").innerText = error.message;
        document.getElementById("ID").innerText = "Não encontrado"
        document.getElementById("Ingredientes").innerText =  "Nada..."
        document.getElementById("Avaliacao").innerText = "Negativa"
        document.getElementById("Categoria").innerText = "Nenhuma"
        image.src = "assets/imgs/cozinhafogo.avif"
        image.style.display = "block";
        
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
    if (posicaoAT <= 0) {
        posicaoAT = listaReceitas.length - 1;
    } else {
        posicaoAT--;
    }

    Button(listaReceitas[posicaoAT]);
}