/*----- constants -----*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/

let board;
// let turn = 'X';
let turn = 'X';
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const button = document.querySelector('button');
// console.log(button);
/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleTurn)
button.addEventListener('click', init)
/*----- functions -----*/

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    messages.textContent = `It's ${turn}'s Turn`;
    render();
};

init();

function handleTurn(event) {
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? '0' : 'X'; //ternary
    // If statement would look like:
    // if (turn === 'X') {
    // turn = '0'
    // } else {
    // turn = 'X'
    // };
    win = getWinner();

    render();
};

function render() {
    board.forEach(function (val, idx) {
        squares[idx].textContent = val;
    });
    messages.textContent = win === 'tie' ? 'tie' : win ? ` ${win} wins` : `It's ${turn}'s Turn`;
};

function getWinner() {
    let winner = null;
    winningCombos.forEach(function (combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }

    });

    return winner ? winner : board.includes('') ? null : 'tie';

};