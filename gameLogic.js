// Define common variables
let canvas, context, box, snake, direction, food, gameInterval;
//background of board
function drawBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
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
    
    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }

    // Check if the snake collides with the food
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    // Create a new head for the snake
    let newHead = { x: snakeX, y: snakeY };


    // Update the direction of the snake
    snake.unshift(newHead);

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

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }

    // Remove the tail if the snake doesn't eat food
    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        // Generate new food at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Create a new head for the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Add the new head to the beginning of the snake array
    snake.unshift(newHead);

    // Redraw the game
    drawBG();
    drawSnake();
    drawFood();
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

// Initialize the game based on the title of the HTML document
// Check the document title
console.log(document.title);

// Initialize the game based on the title of the HTML document
if (document.title === "Level 1") {
    console.log(document.getElementById("snake_1"));
    initLevelOne();
} else if (document.title === "Level 2") {
    console.log(document.getElementById("snake_2"));
    initLevelTwo();
}

console.log('success');
