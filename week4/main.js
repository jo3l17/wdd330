const gameBoardDiv = document.getElementById('gameBoard');
const divs = document.querySelectorAll('#gameBoard>div');
const winner = document.getElementById('winner');
const player1 = 'X';
const player2 = 'O'
let currentPlayer = player1
let gameOver = false

function checkBoard() {
    //make const that shows all winning arrays
    const winningArrays = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [3, 4, 5], [6, 7, 8], [2, 4, 6]];
    //now take the 4 values in each winningArray & plug them into the squares values
    for (let y = 0; y < winningArrays.length; y++) {
        const square1 = divs[winningArrays[y][0]];
        const square2 = divs[winningArrays[y][1]];
        const square3 = divs[winningArrays[y][2]];
        //now check those arrays to see if they all have the class of p1
        if (square1.classList.contains('p1') &&
            square2.classList.contains('p1') &&
            square3.classList.contains('p1')) {
            //if they do, p1 is passed as the winner
            winner.textContent = 'Player 1 wins';
            stopgame();
        }
        // now check to see if they all have the classname p2
        else if (square1.classList.contains('p2') &&
            square2.classList.contains('p2') &&
            square3.classList.contains('p2')) {
            //if they do, p2 is passed as the winner as well as the chip positions
            winner.textContent = 'Player 2 wins';
            stopgame();
        } else {
            let tie = 0
            divs.forEach((element) => {
                if (element.classList.contains('clicked')) {
                    tie++
                }
            })
            if (tie == 9 && winner.textContent == '') {
                winner.textContent = 'Tie !!!'
                stopgame();
            }
        }
    }
}
divs.forEach((element) => {
    element.addEventListener('click', () => addPlayer(element));
});
function stopgame() {
    gameOver = true
    divs.forEach(element => element.classList.add('clicked'));
};
function addPlayer(element) {
    if (element.classList.contains('clicked')) {
        if (gameOver) {
            alert('The game is over')
        } else {
            alert('invalid selection')
        }
    } else {
        element.classList.add('clicked');
        if (currentPlayer == player1) {
            element.classList.add('p1');
            element.textContent = player1
            currentPlayer = player2
            checkBoard();
        } else {
            element.classList.add('p2');
            element.textContent = player2
            currentPlayer = player1
            checkBoard();
        }
    }
}
function reset() {
    divs.forEach((div) => {
        div.textContent = "";
        div.classList.remove('p1');
        div.classList.remove('p2');
        div.classList.remove('clicked');
        currentPlayer = player1;
        winner.textContent = ""
        gameOver = false;
    })
}