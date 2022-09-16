const grid = document.querySelector('.gameGrid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
const playerStart = [230, 10];
let currentPosition = playerStart;
const ballStart = [270, 40];
let ballPosition = ballStart;
let timerId;
let xDirection = 2;
let yDirection = 2;

//--------------------------------------------------------------------------------------------------------------------------------------------------//
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]


function buildBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

buildBlock();

const player = document.createElement('div');
player.classList.add('player');
drawUserPosition();
grid.appendChild(player);

function drawUserPosition() {
    player.style.left = currentPosition[0] + 'px';
    player.style.bottom = currentPosition[1] + 'px';
}

function drawBallPosition() {
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
}

//now to create an event listener keydown to move left and right

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUserPosition();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUserPosition()
            }
            break;
    }
}

document.addEventListener('keydown', movePlayer);

//time to add the ball 

const ball = document.createElement('div');
ball.classList.add('ball');
ball.style.left = ballPosition[0] + 'px';
ball.style.bottom = ballPosition[1] + 'px';
grid.appendChild(ball);

function moveBall() {
    ballPosition[0] += xDirection;
    ballPosition[1] += yDirection;
    drawBallPosition()
}

timerId = setInterval(moveBall, 30);


function checkCollision() {
    if (ballPosition[0] >= (boardWidth - ballDiameter) || ballPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection()
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return;
    } if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return;
    } if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return;
    } if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return;
    }
}