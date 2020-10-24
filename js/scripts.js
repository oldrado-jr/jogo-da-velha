const x = document.querySelector('.x');
const o = document.querySelector('.o');
const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('#buttons-container button');

let secondPlayer;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        secondPlayer = button.getAttribute('id');

        for (let i = 0; i < buttons.length; i++) {
            const element = buttons[i];
            element.style.display = 'none';
        }

        setTimeout(() => {
            const container = document.querySelector('#container');
            container.classList.remove('hide');
        }, 500);
    });
});

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

            if ('ai-player' == secondPlayer) {
                computerPlay();
                player2++;
            }
        } else {
            player2++;
        }

        const plays = player1 + player2;

        if (plays < 5 || checkWinCondition()) {
            return;
        }

        if (9 === plays) {
            appendMessage('Deu velha!');
            resetPlayerCount();
            clearTable();
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
        return true;
    }

    diagonal = [];

    for (let i = MAX_SIZE - 1; i < boxes.length; i += MAX_SIZE - 1) {
        diagonal.push(boxes[i]);
    }

    if (isLineEqual(diagonal)) {
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
        declareWinner(pos0.childNodes[0].className);
        resetPlayerCount();
        clearTable();
        return true;
    }

    return false;
}

// Obtém o elemento vencedor
function getWinnerElement(line) {
    return line[0].childNodes[0].className;
}

function declareWinner(winner) {
    const scoreboardX = document.querySelector('#scoreboard-1');
    const scoreboardO = document.querySelector('#scoreboard-2');
    let message = '';

    switch (winner) {
        case x.className:
            scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
            message = 'Jogador 1 venceu';
            break;
        case o.className:
            scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
            message = 'Jogador 2 venceu';
            break;
    }

    appendMessage(message);
}


function appendMessage(message) {
    const messageContainer = document.querySelector('#message');
    const messageText = document.querySelector('#message p');

    // Exibe mensagem
    messageText.textContent = message;
    messageContainer.classList.remove('hide');

    // Esconde mensagem
    setTimeout(() => {
        messageContainer.classList.add('hide');
    }, 3000)
}

// Zera as jogadas
function resetPlayerCount() {
    player1 = 0;
    player2 = 0;
}

// Limpa o tabuleiro
function clearTable() {
    const boxesToRemove = document.querySelectorAll('.box div');

    boxesToRemove.forEach((box) => {
        box.parentNode.removeChild(box);
    });
}

function computerPlay() {
    const cloneO = o.cloneNode(true);
    let counter = 0; // Quantidade de jogadas
    let filled = 0; // Quantidade de campos preenchidos

    boxes.forEach(box => {
        const randomNumber = Math.floor(Math.random() * 5);

        if (box.childNodes[0]) {
            filled++;
        } else if (randomNumber <= 1) {
            box.appendChild(cloneO);
            counter++;
            return;
        }
    });

    if (0 === counter && filled < 9) {
        computerPlay();
    }
}
