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

        const plays = player1 + player2;

        if (plays < 5) {
            return;
        }

        if (9 === plays && !checkWinCondition()) {
            console.log('Deu velha!');
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

// Vê quem ganhou
function checkWinCondition() {
    if (checkHorizontally()) {
        return true;
    }

    if (checkVertically()) {
        return true;
    }

    return checkDiagonally();
}

// Número máximo de linhas e colunas do tabuleiro
const MAX_SIZE = Math.sqrt(boxes.length);

// Vê se os elementos são iguais na horizontal
function checkHorizontally() {
    let line = [];

    for (let i = 0; i < boxes.length; i++) {
        line.push(boxes[i]);

        if (line.length < MAX_SIZE) {
            continue;
        }

        if (isLineEqual(line)) {
            console.log(`${getWinnerElement(line)} venceu`);
            return true;
        }

        line = [];
    }

    return false;
}

// Vê se os elementos são iguais na vertical
function checkVertically() {
    for (let j = 0; j < MAX_SIZE; j++) {
        let line = [];

        for (let i = j; i < boxes.length; i += MAX_SIZE) {
            line.push(boxes[i]);
        }

        if (isLineEqual(line)) {
            console.log(`${getWinnerElement(line)} venceu`);
            return true;
        }
    }

    return false;
}

// Vê se os elementos são iguais na diagonal
function checkDiagonally() {
    let diagonal = [];

    for (let i = 0; i < boxes.length; i += MAX_SIZE + 1) {
        diagonal.push(boxes[i]);
    }

    if (isLineEqual(diagonal)) {
        console.log(`${getWinnerElement(diagonal)} venceu`);
        return true;
    }

    diagonal = [];

    for (let i = MAX_SIZE - 1; i < boxes.length; i += MAX_SIZE - 1) {
        diagonal.push(boxes[i]);
    }

    if (isLineEqual(diagonal)) {
        console.log(`${getWinnerElement(diagonal)} venceu`);
        return true;
    }

    return false;
}

// Vê se a linha possui todos os elementos iguais
function isLineEqual(line) {
    const [pos0, pos1, pos2] = line;

    if (
        (pos0.childNodes[0] && pos1.childNodes[0] && pos2.childNodes[0])
        && pos0.childNodes[0].className == pos1.childNodes[0].className
        && pos1.childNodes[0].className == pos2.childNodes[0].className
    ) {
        return true;
    }

    return false;
}

// Obtém o elemento vencedor
function getWinnerElement(line) {
    return line[0].childNodes[0].className;
}
