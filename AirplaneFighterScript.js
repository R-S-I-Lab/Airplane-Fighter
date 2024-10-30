let plane = document.getElementById("plane");
let gameArea = document.getElementById("gameArea");
let score = 0, gameInterval = 0;
const positions = ["0px", "200px", "400px"];

function moveObstacles() {
    let obstacles = document.getElementsByClassName("obstacle");
    for (let i = 0; i < obstacles.length; ++i) {
        let topPosition = parseInt(window.getComputedStyle(obstacles[i]).top, 10);
        obstacles[i].style.top = (topPosition + 1) + "px";
        if (topPosition > 600) {
            obstacles[i].remove();
        }
    }
}

function createObstacles() {
    let obstacle = document.createElement("div");
    obstacle.id = "obstacle";
    obstacle.className = "obstacle";
    const index1 = Math.floor(Math.random() * positions.length);
    obstacle.style.left = positions[index1];
    gameArea.appendChild(obstacle);
}

function startGame() {
    const card = document.getElementById("startCard");
    card.remove();
    createObstacles();
}

document.addEventListener("keydown",function(e) {
    let leftPosition = parseInt(window.getComputedStyle(plane).left, 10);
    if(e.keyCode === 37 && leftPosition > 100) {
        plane.style.left = (leftPosition - 200) + "px";
    } else if (e.keyCode === 39 && leftPosition < 500) {
        plane.style.left = (leftPosition + 200) + "px";
    }
});

document.getElementById("startGame").addEventListener("click", function() {
    gameInterval = setInterval(function () {
        ++score;
        if (!(score % 250)) {
            createObstacles();
        }
        if (!(score % 100)) {
            updateScore();
        }
        moveObstacles();
        checkCollision();
    }, 1);
});

function updateScore() {
    const scoreBoard = document.getElementById("score");
    scoreBoard.innerText = "Score: " + Math.floor(score / 100);
}

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

function checkCollision() {
    const obstacles = document.getElementsByClassName("obstacle");
    for (let i = 0; i < obstacles.length; ++i) {
        if (isCollision(plane, obstacles[i])) {
            clearInterval(gameInterval);
            showScore();
            break;
        }
    }
}

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function showScore() {
    let finalScore = addAttributes(document.createElement("div"), ["class", "card_result"]);
    finalScore.innerText = "Game Over! Your score: " + Math.floor(score / 100);
    const restartButton = addAttributes(document.createElement("button"), ["class",
        "btn btn-primary", "style", "width:150px", "onclick", "window.location.reload()"]);
    restartButton.innerText = "Restart Game";
    finalScore.appendChild(restartButton);
    gameArea.appendChild(finalScore);
}