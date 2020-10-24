const x = document.querySelector('.x');
const o = document.querySelector('.o');
const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('#buttons-container button');
const messageContainer = document.querySelector('#message');
const messageText = document.querySelector('#message p');

// Contador de jogadas
let player1 = 0;
let player2 = 0;

// Adicionando o evento de click aos boxes
boxes.forEach(box => {
    // Quando alguém clica na caixa
    box.addEventListener('click', () => {
        // Verifica se já tem X ou O
        if (box.childNodes.length > 0) {
            return;
        }

        const element = checkElement(player1, player2);
        const cloneElement = element.cloneNode(true);
        box.appendChild(cloneElement);

        // Computar jogada
        if (player1 == player2) {
            player1++;
        } else {
            player2++;
        }
    });
});

// Vê quem vai jogar
function checkElement(player1, player2) {
    let element;

    if (player1 == player2) {
        // x
        element = x;
    } else {
        // o
        element = o;
    }

    return element;
}
