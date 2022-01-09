//variable which stores all cells on the game board
const cells = Array.from(document.getElementsByClassName('container-cell'));

//assign unique identifiers to each cell
let letters = ['-', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', '-', '-'];
let nums = ['-', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '-'];
let allCoordinates = [];
let counter = 0;
for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
        cells[counter].id = letters[row + 2] + nums[col + 2];
        allCoordinates.push(letters[row + 2] + nums[col + 2]);
        counter = counter + 1;
        //document.getElementById(cells[counter].id).style.backgroundColor = 'white';
    }
}

//gameboard containing colors in each cell
let gameBoard = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '']
];

//variables storing the pause button and message div
let pause = document.getElementById('game-over');
let message = document.getElementById('message');

//tracks the number of rotations on a given piece
let rotationNumber = 1;
//types of pieces
let pieceTypes = ['red', 'green', 'blue', 'purple', 'pink', 'yellow', 'orange'];
//current piece type
let currentPiece = '';
//path of the current piece
let initialPath = [];

//rotation operations for different pieces
function redRotation(path) {
    let updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber % 2 === 0) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 1] + nums[nums.indexOf(path[0].charAt(1)) + 2]);
        updatedPath.push(path[0].charAt(0) + nums[nums.indexOf(path[1].charAt(1)) + 1]);
        updatedPath.push(path[1]);
        updatedPath.push(path[2]);
    }
    else {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 1] + nums[nums.indexOf(path[0].charAt(1)) - 2]);
        updatedPath.push(path[2]);
        updatedPath.push(path[3]);
        updatedPath.push(path[3].charAt(0) + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function greenRotation(path) {
    let updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber % 2 === 0) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 2] + nums[nums.indexOf(path[0].charAt(1)) + 1]);
        updatedPath.push(path[2]);
        updatedPath.push(path[3]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + path[3].charAt(1));
    }
    else {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 2] + nums[nums.indexOf(path[0].charAt(1)) - 1]);
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) + 1] + path[1].charAt(1));
        updatedPath.push(path[1]);
        updatedPath.push(path[2]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function blueRotation(path) {
    updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    let letter = path[2].charAt(0);
    let num = path[2].charAt(1);

    if (rotationNumber % 2 === 0) {
        updatedPath.push(letters[letters.indexOf(letter) - 2] + num);
        updatedPath.push(letters[letters.indexOf(letter) - 1] + num);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(letter) + 1] + num);
    }
    else {
        updatedPath.push(letter + nums[nums.indexOf(num) - 2]);
        updatedPath.push(letter + nums[nums.indexOf(num) - 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letter + nums[nums.indexOf(num) + 1]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function purpleRotation(path) {
    updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber === 1) {
        updatedPath.push(path[0].charAt(0) + nums[nums.indexOf(path[0].charAt(1)) - 2]);
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) - 1] + nums[nums.indexOf(path[1].charAt(1)) - 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }
    else if (rotationNumber === 2) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 2] + path[0].charAt(1));
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) - 1] + nums[nums.indexOf(path[1].charAt(1)) + 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }
    else if (rotationNumber === 3) {
        updatedPath.push(path[0].charAt(0) + nums[nums.indexOf(path[0].charAt(1)) + 2]);
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) + 1] + nums[nums.indexOf(path[1].charAt(1)) + 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }
    else if (rotationNumber === 4) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 2] + path[0].charAt(1));
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) + 1] + nums[nums.indexOf(path[1].charAt(1)) - 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function pinkRotation(path) {
    updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber === 1) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 2] + path[0].charAt(1));
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) + 1] + nums[nums.indexOf(path[1].charAt(1)) + 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }
    else if (rotationNumber === 2) {
        updatedPath.push(path[0].charAt(0) + nums[nums.indexOf(path[0].charAt(1)) - 2]);
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) + 1] + nums[nums.indexOf(path[1].charAt(1)) - 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }
    else if (rotationNumber === 3) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 2] + path[0].charAt(1));
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) - 1] + nums[nums.indexOf(path[1].charAt(1)) - 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }
    else if (rotationNumber === 4) {
        updatedPath.push(path[0].charAt(0) + nums[nums.indexOf(path[0].charAt(1)) + 2]);
        updatedPath.push(letters[letters.indexOf(path[1].charAt(0)) - 1] + nums[nums.indexOf(path[1].charAt(1)) + 1]);
        updatedPath.push(path[2]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function yellowRotation(path) {
    updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber === 1) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 1] + nums[nums.indexOf(path[0].charAt(1)) - 1]);
        updatedPath.push(path[1]);
        updatedPath.push(letters[letters.indexOf(path[2].charAt(0)) - 1] + nums[nums.indexOf(path[2].charAt(1)) + 1]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }
    else if (rotationNumber === 2) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 1] + nums[nums.indexOf(path[0].charAt(1)) + 1]);
        updatedPath.push(path[1]);
        updatedPath.push(letters[letters.indexOf(path[2].charAt(0)) + 1] + nums[nums.indexOf(path[2].charAt(1)) - 1]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) - 1]);
    }
    else if (rotationNumber === 3) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) + 1] + nums[nums.indexOf(path[0].charAt(1)) - 1]);
        updatedPath.push(path[1]);
        updatedPath.push(letters[letters.indexOf(path[2].charAt(0)) - 1] + nums[nums.indexOf(path[2].charAt(1)) + 1]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) - 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }
    else if (rotationNumber === 4) {
        updatedPath.push(letters[letters.indexOf(path[0].charAt(0)) - 1] + nums[nums.indexOf(path[0].charAt(1)) + 1]);
        updatedPath.push(path[1]);
        updatedPath.push(letters[letters.indexOf(path[2].charAt(0)) + 1] + nums[nums.indexOf(path[2].charAt(1)) - 1]);
        updatedPath.push(letters[letters.indexOf(path[3].charAt(0)) + 1] + nums[nums.indexOf(path[3].charAt(1)) + 1]);
    }

    if (outOfBounds(updatedPath) === false && overlaps(updatedPath) === false) {
        //initialPath = updatedPath;
        return updatedPath;
    }
    else {
        rotationNumber = rotationNumber - 1;
        return path;
    }
    //initialPath = updatedPath;
}

function orangeRotation(path) {
    updatedPath = [];
    rotationNumber = rotationNumber + 1;

    if (rotationNumber > 4) {
        rotationNumber = 1;
    }

    if (rotationNumber === 1 || rotationNumber === 2 || rotationNumber === 3 || rotationNumber === 4) {
        updatedPath = path;
    }

    return path;
}

//array of all rotation operations for convenience
let rotationFunctions = [greenRotation, redRotation, blueRotation, purpleRotation, pinkRotation, yellowRotation, orangeRotation];

//function which checks to see if the piece is within the grid or not
function outOfBounds(path) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].charAt(0) === '-' || path[i].charAt(1) === '-') {
            return true;
        }
    }
    return false;
}

//function which checks to see if the piece is overlapping with another piece or not
function overlaps(path) {
    for (let i = 0; i < path.length; i++) {
        /*
        if (filledCells.indexOf(path[i]) !== -1) {
            return true;
        }
        */
        let letter = letters.indexOf(path[i].charAt(0)) - 2;
        let number = nums.indexOf(path[i].charAt(1)) - 2;

        if (gameBoard[letter][number] !== '') {
            return true;
        }
    }
    return false;
}

//shifts the piece down by 1 square
function shiftDown(path) {
    updatedPath = [];
    for (let i = 0; i < path.length; i++) {
        updatedPath.push(letters[letters.indexOf(path[i].charAt(0)) + 1] + path[i].charAt(1));
    }
    return updatedPath;
}

//shifts the piece right by 1 square
function shiftRight(path) {
    updatedPath = [];
    for (let i = 0; i < path.length; i++) {
        updatedPath.push(path[i].charAt(0) + nums[nums.indexOf(path[i].charAt(1)) + 1]);
    }
    return updatedPath;
}

//shifts the piece left by one square
function shiftLeft(path) {
    updatedPath = [];
    for (let i = 0; i < path.length; i++) {
        updatedPath.push(path[i].charAt(0) + nums[nums.indexOf(path[i].charAt(1)) - 1]);
    }
    return updatedPath;
}

//introduces a new piece to the top of the grid
function introduceNewPiece() {
    let rand = Math.floor(Math.random() * (7))
    rotationNumber = 1;
    
    if (rand === 0) {
        initialPath = ['b4', 'b5', 'a5', 'a6'];
        currentPiece = pieceTypes[0];
    }
    else if (rand === 1) {
        initialPath = ['a4', 'a5', 'b5', 'b6'];
        currentPiece = pieceTypes[1];
    }
    else if (rand === 2) {
        initialPath = ['a3', 'a4', 'a5', 'a6'];
        currentPiece = pieceTypes[2];
    }
    else if (rand === 3) {
        initialPath = ['b4', 'a4', 'a5', 'a6'];
        currentPiece = pieceTypes[3];
    }
    else if (rand === 4) {
        initialPath = ['b6', 'a6', 'a5', 'a4'];
        currentPiece = pieceTypes[4];
    }
    else if (rand === 5) {
        initialPath = ['a4', 'a5', 'a6', 'b5'];
        currentPiece = pieceTypes[5];
    }
    else if (rand === 6) {
        initialPath = ['a4', 'a5', 'b4', 'b5'];
        currentPiece = pieceTypes[6];
    }

    //check if game is over before moving on
    if (isGameOver(initialPath)) {
        isPaused = true;
        pause.style.display = "none";
        message.innerText = "Game Over";
    }
    //initialPath = ['a3', 'a4', 'a5', 'a6'];
    //currentPiece = pieceTypes[2];
}

//settles the piece after it cannot go down any further
function settlePiece(path, color) {
    console.log("settled path: " + path);
    for (let i = 0; i < path.length; i++) {

        let row = letters.indexOf(path[i].charAt(0)) - 2;
        let column = nums.indexOf(path[i].charAt(1)) - 2;

        gameBoard[row][column] = color;
    }
}

//colors a given path with the specified color
function color(path, c) {
    //console.log(path);
    for (let i = 0; i < path.length; i++) {
        document.getElementById(path[i]).style.backgroundColor = c;
    }
}

//colors the grid based on the colors assigned to each cell in the game board
function colorGrid() {
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            let letter = letters[row + 2];
            let num = nums[col + 2];
            document.getElementById(letter + num).style.backgroundColor = gameBoard[row][col];
        }
    }
}

//keyboard event listener
document.addEventListener('keydown', function (e) {
    //console.log(e.key);
    //rotates the piece if user clicks arrow up
    if (e.key === "ArrowUp" && !isPaused) {
        color(initialPath, '');
        let index = pieceTypes.indexOf(currentPiece);
        initialPath = rotationFunctions[index](initialPath);
    }
    //moves the piece down 1 square if user clicks arrow down
    else if (e.key === "ArrowDown" && !isPaused) {
        let tempPath = shiftDown(initialPath);
        if (outOfBounds(tempPath) === false && overlaps(tempPath) === false) {
            color(initialPath, '');
            initialPath = tempPath;
            color(initialPath, tempPath);
        }
    }
    //moves the piece right 1 square if user clicks arrow right
    else if (e.key === "ArrowRight" && !isPaused) {
        let tempPath = shiftRight(initialPath);
        if (outOfBounds(tempPath) === false && overlaps(tempPath) === false) {
            color(initialPath, '');
            initialPath = tempPath;
            color(initialPath, currentPiece);
        }
    }
    //moves the piece left 1 square if user clicks arrow left
    else if (e.key === "ArrowLeft" && !isPaused) {
        let tempPath = shiftLeft(initialPath);
        if (outOfBounds(tempPath) === false && overlaps(tempPath) === false) {
            color(initialPath, '');
            initialPath = tempPath;
            color(initialPath, currentPiece);
        }
    }
});

//checks if any row is to be removed
function removeRowChecker() {
    //alert("remove row checker");
    //let blankLine = ['', '', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 20; i++) {
        if (rowColorFilled(i)) {
           for (let b = i; b >= 1; b--) {
               for (let c = 0; c < 10; c++) {
                   gameBoard[b][c] = gameBoard[b - 1][c]; 
               }
           }
           for (let d = 0; d < 10; d++) {
               gameBoard[0][d] = '';
           }
           i = i - 1;
        }
    }
}

//checks if a given row is full
function rowColorFilled(row) {
    for (let i = 0; i < 10; i++) {
        if (gameBoard[row][i] === '') {
            return false;
        }
    }
    return true;
}

//initializes pause to be false, and a function which pauses or unpauses the game based on when the pause button is pressed
let isPaused = false;
function pauseGame() {
    isPaused = !isPaused;
}

//checks whether the game is over
function isGameOver(path) {
    for (let i = 0; i < path.length; i++) {
        let letter = letters.indexOf(path[i].charAt(0)) - 2;
        let num = nums.indexOf(path[i].charAt(1)) - 2;
        if (gameBoard[letter][num] !== '') {
            return true;
        }
    }
    return false;
}

//function which restarts the game whenever the restart button is clicked
function restartGame() {
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) {
            gameBoard[row][col] = '';
        }
    }
    isPaused = false;
    pause.style.display = "block";
    message.innerText = "";
    colorGrid();
    color(initialPath, '');
    introduceNewPiece();
    color(initialPath, currentPiece);
}

//start of the game
//first introduce a new piece and color it in
introduceNewPiece();
color(initialPath, currentPiece);

//constant interval where the piece continuously moves downward every 700 milliseconds
const interval = setInterval(function () {
    if (!isPaused) {
        const interval2 = setInterval(function () {
            color(initialPath, currentPiece);
        }, 0);

        color(initialPath, '');
        //if the piece does not overlap with any other piece nor goes outside the grid, then shift the piece down
        //else, settle the piece down and introduce a new piece to the top
        //check if there are any rows which are fully colored and add score accordingly
        let tempPath = shiftDown(initialPath);
        if (outOfBounds(tempPath) || overlaps(tempPath)) {
            settlePiece(initialPath, currentPiece);
            console.log(gameBoard);
            introduceNewPiece();
            removeRowChecker();
            colorGrid();
        }
        else {
            initialPath = tempPath;
        }
    }
}, 700);