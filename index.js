const frenteDaCarta = [
    "img/bobrossparrot.gif",
    "img/explodyparrot.gif",
    "img/fiestaparrot.gif",
    "img/metalparrot.gif",
    "img/revertitparrot.gif",
    "img/tripletsparrot.gif",
    "img/unicornparrot.gif"
];

let numeroDeCartas = ""

let baralho = document.querySelector(".cartas");

let listaCartas = [];

let carta1 = "";

let carta2 = "";

let contadorDeJogadas = 0;

perguntarQuantasCartas();

adicionarCartas();

adicionarCartasEmbaralhadas();

function iniciarConfetes() {
    const container = document.getElementById("confete-container");
    const cores = ["#f06", "#6bf", "#7c7", "#cc0", "#93f", "#f90"]; 

    const quantidade = 100; 

    for (let i = 0; i < quantidade; i++) {
        const confete = document.createElement("div");
        confete.className = "confete";
        confete.style.left = `${Math.random() * 100}vw`; 
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDuration = `${Math.random() * 3 + 2}s`; 
        confete.style.animationDelay = `${Math.random() * 2}s`; 

        container.appendChild(confete);
    }
}

function parabenizar(){
    alert(`Parabéns, você ganhou com ${contadorDeJogadas} jogadas!`)
    
}

function checarVitoria(){
    const acertadas = document.querySelectorAll(".correta");
    if(numeroDeCartas === acertadas.length){
        iniciarConfetes();
        setTimeout(parabenizar, 1000);
    }
}

function contarJogada() {
    contadorDeJogadas++
}

function acertar() {
    carta1.classList.add("correta");
    carta2.classList.add("correta");
    carta1.removeAttribute("onclick");
    carta2.removeAttribute("onclick");
    carta1.classList.remove("virada");
    carta2.classList.remove("virada");
    carta1 = "";
    carta2 = "";
    checarVitoria();
}

function desvirarCartas(){
    carta1.classList.remove("virada");
    carta2.classList.remove("virada");
    carta1 = "";
    carta2 = "";
}

function selecionarCarta(carta) {
    const cartaSelecionada = document.querySelector(".carta.virada")

    if (carta1 != "" && carta2 != ""){

    }

    else if (carta1 === carta){

    }

    else if (cartaSelecionada == null) {
        carta1 = carta;
        carta.classList.add("virada");
        contarJogada();
    }
    
    else if (carta1.innerHTML === carta.innerHTML) {
        carta2 = carta;
        contarJogada();
        acertar();
    }

    else {
        carta.classList.add("virada");
        carta2 = carta;
        contarJogada();
        setTimeout(desvirarCartas, 1000);
    }
}

function adicionarCartasEmbaralhadas() {
    let cartas = "";

    for (let i = listaCartas.length - 1; i >= 0; i--) {
        cartas += listaCartas[i];
    }

    baralho.innerHTML = cartas;
}

function embaralharCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
}

function adicionarCartas() {
    for (let i = (numeroDeCartas / 2) - 1; i >= 0; i--) {
        listaCartas.push(`<li onclick="selecionarCarta(this)" class="carta">
            <div class="frente face">
                <img src="${frenteDaCarta[i]}">
            </div>

            <div class="verso face">
                <img src="./img/back.png">
            </div>
        </li>`);

        listaCartas.push(`<li onclick="selecionarCarta(this)" class="carta">
            <div class="frente face">
                <img src="${frenteDaCarta[i]}">
            </div>

            <div class="verso face">
                <img src="./img/back.png">
            </div>
        </li>`);
    }

    listaCartas = embaralharCartas(listaCartas);
}

function perguntarQuantasCartas() {
    let cartas = "";

    while (cartas < 4 || cartas > 14 || cartas % 2 !== 0) {
        cartas = Number(prompt("Quantas cartas, pares entre 4 e 14, você deseja no jogo?"));
    }

    numeroDeCartas = cartas;
}