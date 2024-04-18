let canvas = document.getElementById("snake"); //criar elemento que irá rodar o game
let context = canvas.getContext("2d"); //....
let box = 32;
//snake size and position
let snake = [{
    x: 8 * box,
    y: 8 * box
},

{
    x: 7 * box,
    y: 7 * box
},
{
    x: 6 * box,
    y: 6 * box
}];
let direction = "right";
//food position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//background of board
function drawBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//snake
function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//Key controlling event
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function main_1() {
    // Updates the snake's position based on direction.

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;


    drawBG();
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(main_1, 100);
//Reset button event
document.getElementById("resetButton").addEventListener("click", function () {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Reset snake position and direction
    snake = [{
        x: 8 * box,
        y: 8 * box
    },

    {
        x: 7 * box,
        y: 7 * box
    },
    {
        x: 6 * box,
        y: 6 * box
    }];
    direction = "right";

    // Reset food position
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    // Restart the game loop
    clearInterval(game);
    game = setInterval(main_1, 100);
});