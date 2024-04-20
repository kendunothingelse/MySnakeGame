// Define common variables
let canvas, context, box, snake, direction, food, gameInterval, wall;
// Define variables for score and scoreboard element
let score = 0;
const scoreDisplay = document.getElementById('score');
//background of board. Hàm này được sử dụng để vẽ nền cho trò chơi trên canvas.
function drawBG() {
    context.fillStyle = "#8B956D";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//snake. Hàm này được sử dụng để vẽ con rắn trên canvas.
function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = "#6286D9";
        } else {
            context.fillStyle = "#ADD962";
        }
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}
//food. Hàm này được sử dụng để vẽ thức ăn trên canvas.
function drawFood() {
    context.fillStyle = "#FF9F91";
    context.fillRect(food.x, food.y, box, box);
}
//wall. Hàm này được sử dụng để vẽ các khối tường trên canvas.
function drawWall() {
    context.fillStyle = "#2E331D";
    wall.forEach(wallBlock => {
        context.fillRect(wallBlock.x, wallBlock.y, box, box);
    });
}
// Function to update the score on the scoreboard
function updateScore() {
    scoreDisplay.textContent = score;
}
//Hàm tạo thức ăn mới 
function generateFood() {
    for (let i = 0; i < wall.length; i++) {
        if ((wall[i].x != food.x) || (wall[i].y != food.y)) {
            drawWall();
            drawFood();
            break;
        }

    }

}
//Hàm cập nhật hướng di chuyển
function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Các hàm này chứa logic chính của trò chơi cho từng cấp độ.
// Các hàm này xử lý việc di chuyển của con rắn, va chạm với các phần tử khác, kiểm tra điều kiện thắng/thua và vẽ lại trạng thái mới của trò chơi.
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
        playEatSound();
    }


    // Create a new head for the snake
    let newHead = { x: snakeX, y: snakeY };


    // Update the direction of the snake
    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        playFailSound();
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
        playEatSound();
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
        playFailSound();
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
        playEatSound();
        updateScore();
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        playFailSound();
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
        playEatSound();
        updateScore();
    }



    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (gameOver) {
        clearInterval(gameInterval); // Stop the game loop
        playFailSound();
        alert('Game Over :(');
        return; // Exit the function to prevent further execution
    }
    drawBG();
    drawSnake();
    generateFood();
}

// Các hàm này được sử dụng để khởi tạo trạng thái ban đầu của trò chơi cho từng cấp độ.
// Các hàm này cài đặt các biến, sự kiện và bắt đầu vòng lặp trò chơi.
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
    document.getElementById("resetButton").addEventListener("click", resetLevelOne);
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
    document.getElementById("resetButton").addEventListener("click", resetLevelTwo);
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
    },

    {
        x: 9 * box,
        y: 13 * box
    },
    {
        x: 9 * box,
        y: 14 * box
    }, 
    {
        x: 10 * box,
        y: 13 * box
    }
    ];
    // Event listener for key controls
    document.addEventListener('keydown', update);

    // Start the game loop
    gameInterval = setInterval(mainLevelThree, 100);

    // Event listener for reset button
    document.getElementById("resetButton").addEventListener("click", resetLevelThree);
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
    document.getElementById("resetButton").addEventListener("click", resetLevelFour);
}
// Các hàm này được sử dụng để thiết lập lại trò chơi khi người chơi muốn chơi lại sau khi thua cuộc.
// Các hàm này xóa bộ đếm thời gian và khởi tạo lại trạng thái ban đầu của trò chơi.
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
// Đoạn mã kiểm tra tiêu đề của tài liệu HTML và khởi tạo trò chơi tương ứng với từng cấp độ thông qua các hàm initLevelOne, initLevelTwo, initLevelThree và initLevelFour.
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
        document.getElementById("openButton").innerHTML = "Information";

    } else {
        document.getElementById("info-popup").style.display = "block";
        document.getElementById("openButton").innerHTML = "Close";

    }

}
//audio 
let eatSound = new Audio("data:audio/mp3;base64,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");
let failSound = new Audio("data:audio/mp3;base64,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V4pVMvFEq8FQ1Tx6Gp///////////xAAF9hwDWCAIEDAFm4CCkBpdMWAkIAcDp1l4ASBlgBCwIFQlO1JRRvlaeiPKaAZTWeGGakExGxQxGxnMzsqTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//PkZAAAAAGkAOAAAAAAA0gBwAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
function playEatSound(){
    eatSound.play();
}
function playFailSound(){
    failSound.play();
}
