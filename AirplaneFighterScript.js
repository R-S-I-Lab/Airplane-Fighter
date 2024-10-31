let plane = document.getElementById("plane");
let gameArea = document.getElementById("gameArea");
let score = 0, gameInterval = 0;
const hundred = 100, leftArrowKey = 37, rightArrowKey = 39, maxSize = 600;
const frequency = 75;
const positions = ["0px", "200px", "400px"];

function isCollision(plane, obstacle) {
    let planeRect = plane.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    return !(
        planeRect.top > obstacleRect.bottom ||
        planeRect.bottom < obstacleRect.top ||
        planeRect.right < obstacleRect.left ||
        planeRect.left > obstacleRect.right
    );
}

function moveObstacles() {
    let obstacles = document.getElementsByClassName("obstacle");
    for (let i = 0; i < obstacles.length; ++i) {
        let topPosition = parseInt(window.getComputedStyle(obstacles[i]).top, 10);
        obstacles[i].style.top = (topPosition + 3) + "px";
        if (topPosition > maxSize) {
            obstacles[i].remove();
        }
        if (isCollision(plane, obstacles[i])) {
            clearInterval(gameInterval);
            showScore();
            break;
        }
    }
}

function createObstacles() {
    let obstacle = document.createElement("div");
    obstacle.id = "obstacle";
    obstacle.className = "obstacle";
    const index = Math.floor(Math.random() * positions.length);
    obstacle.style.left = positions[index];
    gameArea.appendChild(obstacle);
}

function startGame() {
    const card = document.getElementById("startCard");
    card.remove();
    createObstacles();
    startInterval();
}

document.addEventListener("keydown",function(e) {
    let leftPosition = parseInt(window.getComputedStyle(plane).left, 10);
    if(e.keyCode === leftArrowKey && leftPosition > hundred) {
        plane.style.left = (leftPosition - 2 * hundred) + "px";
    } else if (e.keyCode === rightArrowKey && leftPosition < maxSize - hundred) {
        plane.style.left = (leftPosition + 2 * hundred) + "px";
    }
});

function startInterval() {
    gameInterval = setInterval(function () {
        ++score;
        if (!(score % frequency)) {
            createObstacles();
        }
        if (!(score % hundred)) {
            updateScore();
        }
        moveObstacles();
    }, 10);
}

function updateScore() {
    const scoreBoard = document.getElementById("score");
    scoreBoard.innerText = "Score: " + Math.floor(score / hundred);
}

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function showScore() {
    let finalScore = addAttributes(document.createElement("div"), ["class", "card_result"]);
    finalScore.innerText = "Game Over! Your score: " + Math.floor(score / hundred);
    const restartButton = addAttributes(document.createElement("button"), ["class",
        "btn btn-primary", "style", "width:150px", "onclick", "window.location.reload()"]);
    restartButton.innerText = "Restart Game";
    finalScore.appendChild(restartButton);
    gameArea.appendChild(finalScore);
}
