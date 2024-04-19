// Define common variables
let canvas, context, box, snake, direction, food, gameInterval, wall;
// Define variables for score and scoreboard element
let score = 0;
const scoreDisplay = document.getElementById('score');
//background of board
function drawBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//snake
function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = "blue";

        } else {
            context.fillStyle = "green";
        }
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//wall
function drawWall() {
    context.fillStyle = "gray";
    wall.forEach(wallBlock => {
        context.fillRect(wallBlock.x, wallBlock.y, box, box);
    });
}
// Function to update the score on the scoreboard
function updateScore() {
    scoreDisplay.textContent = score;
}
function generateFood() {
    for (let i = 0; i < wall.length; i++) {
        if ((wall[i].x != food.x) || (wall[i].y != food.y)) {
            drawWall();
            drawFood();
            break;
        }

    }

}

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}
// Function for level one game logic
function mainLevelOne() {
    // Level one specific game logic
    gameOver = false;
    // Update the snake's position based on direction
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    let snakeX = snake[0].x + (direction === "right" ? box : direction === "left" ? -box : 0);
    let snakeY = snake[0].y + (direction === "down" ? box : direction === "up" ? -box : 0);

    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver = true;
            break;
        }
    }

    // Check if the snake collides with the food
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score += 10;
        updateScore();
    }


    // Create a new head for the snake
    let newHead = { x: snakeX, y: snakeY };


    // Update the direction of the snake
    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }

    // Redraw the game
    drawBG();
    drawSnake();
    drawFood();
}

// Function for level two game logic
function mainLevelTwo() {
    // Level two specific game logic
    let gameOver = false; // Flag to track game over condition

    // Update the snake's position based on direction
    let snakeX = snake[0].x + (direction === "right" ? box : direction === "left" ? -box : 0);
    let snakeY = snake[0].y + (direction === "down" ? box : direction === "up" ? -box : 0);

    // Check if the snake hits the boundaries
    if (snakeX >= 16 * box || snakeX < 0 || snakeY >= 16 * box || snakeY < 0) {
        gameOver = true;
    }

    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver = true;
            break;
        }
    }


    // Check if the snake collides with the food
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score += 10;
        updateScore();
    }

    // Create a new head for the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Add the new head to the beginning of the snake array
    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }

    // Redraw the game
    drawBG();
    drawSnake();
    drawFood();
}

// Function for level three game logic
function mainLevelThree() {
    let gameOver = false; // Flag to track game over condition

    // Updates the snake's position based on direction.
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // Check if the snake hits the boundaries
    if (snakeX >= 16 * box || snakeX < 0 || snakeY >= 16 * box || snakeY < 0) {
        gameOver = true;
    }
    // Check if the snake collides with the wall
    for (let i = 0; i < wall.length; i++) {
        if (snakeX === wall[i].x && snakeY === wall[i].y) {
            gameOver = true;
            break;
        }
    }
    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver = true;
            break;
        }
    }
    // Check if the snake collides with the food
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score += 10;
        updateScore();
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }

    drawBG();
    drawSnake();
    generateFood();
}

// Function for level four game logic
function mainLevelFour() {
    let gameOver = false; // Flag to track game over condition

    // Updates the snake's position based on direction.
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    // Check if the snake hits the boundaries
    if (snakeX >= 16 * box || snakeX < 0 || snakeY >= 16 * box || snakeY < 0) {
        gameOver = true;
    }
    // Check if the snake collides with the wall
    for (let i = 0; i < wall.length; i++) {
        if (snakeX === wall[i].x && snakeY === wall[i].y) {
            gameOver = true;
            break;
        }
    }
    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snakeX === snake[i].x && snakeY === snake[i].y) {
            gameOver = true;
            break;
        }
    }
    // Check if the snake collides with the food
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        for (let i = 0; i < wall.length; i++) {
            wall[i].x = Math.floor(Math.random() * 15 + i) * box;
            wall[i].y = Math.floor(Math.random() * 15 + i) * box;

        }
        score += 10;
        updateScore();
    }



    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }
    drawBG();
    drawSnake();
    generateFood();
}
// Function to initialize level one
function initLevelOne() {
    canvas = document.getElementById("snake_1");
    context = canvas.getContext("2d");
    box = 32;
    snake = [{ x: 8 * box, y: 8 * box }, { x: 7 * box, y: 7 * box }, { x: 6 * box, y: 6 * box }];
    direction = "right";
    food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };

    // Event listener for key controls
    document.addEventListener('keydown', update);

    // Start the game loop
    gameInterval = setInterval(mainLevelOne, 100);

    // Event listener for reset button
    document.getElementById("resetButton_1").addEventListener("click", resetLevelOne);
}

// Function to initialize level two
function initLevelTwo() {
    canvas = document.getElementById("snake_2");
    context = canvas.getContext("2d");
    box = 32;
    snake = [{ x: 8 * box, y: 8 * box }, { x: 7 * box, y: 7 * box }, { x: 6 * box, y: 6 * box }];
    direction = "right";
    food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };

    // Event listener for key controls
    document.addEventListener('keydown', update);

    // Start the game loop
    gameInterval = setInterval(mainLevelTwo, 100);

    // Event listener for reset button
    document.getElementById("resetButton_2").addEventListener("click", resetLevelTwo);
}
function initLevelThree() {

    canvas = document.getElementById("snake_3");
    context = canvas.getContext("2d");
    box = 32;
    snake = [{ x: 8 * box, y: 8 * box }, { x: 7 * box, y: 7 * box }, { x: 6 * box, y: 6 * box }];
    direction = "right";
    food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
    wall = [{
        x: 3 * box,
        y: 5 * box
    },
    {
        x: 3 * box,
        y: 6 * box
    },
    {
        x: 4 * box,
        y: 6 * box
    },
    {
        x: 9 * box,
        y: 6 * box
    },
    {
        x: 9 * box,
        y: 7 * box
    }
    ];
    // Event listener for key controls
    document.addEventListener('keydown', update);

    // Start the game loop
    gameInterval = setInterval(mainLevelThree, 100);

    // Event listener for reset button
    document.getElementById("resetButton_3").addEventListener("click", resetLevelThree);
}
function initLevelFour() {

    canvas = document.getElementById("snake_4");
    context = canvas.getContext("2d");
    box = 32;
    snake = [{ x: 8 * box, y: 8 * box }, { x: 7 * box, y: 7 * box }, { x: 6 * box, y: 6 * box }];
    direction = "right";
    food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box };
    wall = [{
        x: 3 * box,
        y: 5 * box
    },
    {
        x: 3 * box,
        y: 6 * box
    },
    {
        x: 4 * box,
        y: 6 * box
    },
    {
        x: 9 * box,
        y: 6 * box
    },
    {
        x: 9 * box,
        y: 7 * box
    }
    ];
    // Event listener for key controls
    document.addEventListener('keydown', update);

    // Start the game loop
    gameInterval = setInterval(mainLevelFour, 100);

    // Event listener for reset button
    document.getElementById("resetButton_4").addEventListener("click", resetLevelFour);
}
// Function to reset level one
function resetLevelOne() {
    // Level one specific game reset logic
    clearInterval(gameInterval);
    initLevelOne();
}

// Function to reset level two
function resetLevelTwo() {
    // Level two specific game reset logic
    clearInterval(gameInterval);
    initLevelTwo();
}
// Function to reset level three
function resetLevelThree() {
    // Level two specific game reset logic
    clearInterval(gameInterval);
    initLevelThree();
}
// Function to reset level four
function resetLevelFour() {
    // Level two specific game reset logic
    clearInterval(gameInterval);
    initLevelFour();
}
// Initialize the game based on the title of the HTML document
if (document.title === "Level 1") {
    console.log(document.getElementById("snake_1"));
    initLevelOne();
} else if (document.title === "Level 2") {
    console.log(document.getElementById("snake_2"));
    initLevelTwo();
} else if (document.title === "Level 3") {
    console.log(document.getElementById("snake_3"));
    initLevelThree();
} else if (document.title === "Level 4") {
    console.log(document.getElementById("snake_4"));
    initLevelFour();
}

//popup information
function openPopup() {
    if (document.getElementById("info-popup").style.display == "block") {
        document.getElementById("info-popup").style.display = "none";
    } else {
        document.getElementById("info-popup").style.display = "block"
    }
    
}
