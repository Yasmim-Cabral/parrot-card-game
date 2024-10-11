let cartasPossiveis = [
    "./src/img/bobrossparrot.gif",
    "./src/img/explodyparrot.gif",
    "./src/img/fiestaparrot.gif",
    "./src/img/metalparrot.gif",
    "./src/img/revertitparrot.gif",
    "./src/img/tripletsparrot.gif",
    "./src/img/unicornparrot.gif"
];

let temCartaVirada = false;
let estaComparando = false;
let movimentos = 0;
let primeiraCarta, segundaCarta;

function criarCarta() {
    let numeroDeCartas = Number(prompt("Quantas cartas, entre 4 e 14, você quer no seu jogo?"));
    if (numeroDeCartas % 2 != 0 || numeroDeCartas < 4 || numeroDeCartas > 14){
        criarCarta();
    }
    else{
    const cartas = document.querySelector(".cartas");
    let i = 0;
    while (numeroDeCartas > 0) {
        cartas.innerHTML += `<li class="carta" onclick="virarCarta(this)">
    <div class="verso">
    <img src="./src/img/back.png" alt="verso da carta de papagaio">
    </div>
    <div class="frente">
    <img src="${cartasPossiveis[i]}" alt="">
    </div>
    </li>
    <li class="carta" onclick="virarCarta(this)">
    <div class="verso">
    <img src="./src/img/back.png" alt="verso da carta de papagaio">
    </div>
    <div class="frente">
    <img src="${cartasPossiveis[i]}" alt="">
    </div>
    </li>`
        numeroDeCartas -= 2;
        i++;
    }
}
}

function embaralhar() {
    const cartas = document.querySelector(".cartas");
    const baralho = [...cartas.querySelectorAll(".carta")];
    
    for (let i = baralho.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }

    cartas.innerHTML = '';
    baralho.forEach(carta => cartas.appendChild(carta));
}

function virarCarta(carta) {
    if (carta.classList.contains("virada") || estaComparando){
        
    }


    else{
        carta.classList.add("virada")
    contarMovimentos();
    if (!temCartaVirada) {
        temCartaVirada = true;
        primeiraCarta = carta;
    }
    else {
        temCartaVirada = false;
        segundaCarta = carta;

        if (primeiraCarta && segundaCarta && primeiraCarta.innerHTML === segundaCarta.innerHTML) {
            estaComparando = true;
            setTimeout(() => {
                primeiraCarta.classList.add("acerto");
                segundaCarta.classList.add("acerto");
                estaComparando = false;

                if (document.querySelectorAll(".carta:not(.acerto)").length === 0) {
                    alert(`Parabéns! Você venceu em ${movimentos} jogadas!`)
                }
            }, 200);
        }
        else {
            estaComparando = true;
            setTimeout(() => {
                primeiraCarta.classList.remove("virada");
                segundaCarta.classList.remove("virada");
                estaComparando = false;
            }, 1000);
        }

    }
}
}

function contarMovimentos() {
    movimentos++;
}

criarCarta();
embaralhar();