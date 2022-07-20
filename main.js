var fastMode = false;
var rowBlockNumber = 20;
var colBlockNumber = 40;
var multiplierOn = false; var invincibilityOn = false; var slowOn = false;
var isPowerCounterGoing = false;
var currentPowerUpBlock ={row:0,col:0};
var highscore = 0;
var score = 0;
var currentPowerUpBlockGlobal;
var powerUpType;
var blocks = document.getElementsByClassName("block");
var runInterval;
var powerInt; var powerActivate;
 function run(direction) {
    let oldHead = {
        row: snake[0].row,
        col: snake[0].col
    };
    // Move the last block to the head of the snake
    snake.pop();
    snake.splice(1, 0, oldHead);
    grow(foodLocation.row, foodLocation.col);
    detectDeath();
    // Left
    if (direction === "left") {
        if (snake[0].col > 0) {
            snake[0].col -= 1;
            currentDirection = "left";
        }
    // Right
    } else if (direction === "right") {
        if (snake[0].col < (colBlockNumber - 1)) {
            snake[0].col += 1;
            currentDirection = "right";
        }
    // Up
    } else if (direction === "up") {
        if (snake[0].row > 0) {
            snake[0].row -= 1;
            currentDirection = "up";
        }
    // Down
    } else if (direction === "down") {
        if (snake[0].row < (rowBlockNumber - 1)) {
            snake[0].row += 1;
            currentDirection = "down";
        }
    }
    for (let i = 0; i < document.getElementsByClassName("block").length; i++) {
        document.getElementsByClassName("block")[i].classList.remove("current");
    }
    for (let block of snake) {
        var currentBlock = document.getElementsByClassName("row" + block.row + " " + "col" + block.col);
        currentBlock[0].classList.add("current");
    }
};
//starting interval is set
runInterval = setInterval(function (){
    run(currentDirection);
    document.getElementById("score").innerHTML = "Score: "+ score+"";
    document.querySelector("#highscore").innerHTML = "High Score: "+highScore(score)+""
}, 100);
var foodLocation = {row: 0, col: 0};
var counter1 = 1; counter2 = 0; counter3 = 0; counter4 = 0;
var currentFoodBlock = 0;
var isIntervalRunning = true;
var isSnakeMoving = false;
var currentDirection;
var gameOver = false;
var foodRow, foodCol;
var tRow, tCol;
var snake;
// Add "block" class to divs to make the blocks on the board
for (let i = 0; i < rowBlockNumber; i++) {
	for (let j = 0; j < colBlockNumber; j++) {
		var block = document.createElement("div");
		block.classList.add("block");
		block.classList.add("row" + i);
		block.classList.add("col" + j);
		document.getElementById("container").appendChild(block);
	}
}
//Adds random numbers to snake location after death, or start of the game and resets snake length
function snakeLocation(){
    snakeStart = {row: Math.floor(Math.random() * (rowBlockNumber - 1)) + 1, col: Math.floor(Math.random() * (colBlockNumber - 1)) + 1};
    snake = [
        {row: snakeStart.row, col: snakeStart.col},
        {row: snakeStart.row, col: snakeStart.col},
        {row: snakeStart.row, col: snakeStart.col},
    ];
}
//Starting snake length and location
snakeLocation()
//Adds class name: "current" to blocks that the snake array occupies
for (let i = 0; i < snake.length; i++) {
	let snakeBlock = document.getElementsByClassName("row" + snake[i].row + " " + "col" + snake[i].col);
	snakeBlock[0].classList.add("current");
}
//removes old food block class: "food" after it is eaten and adds a new block with the class: "food"
var generateFood = function (){
    foodRow = Math.floor(Math.random() * (rowBlockNumber - 1)) + 1;
    foodCol = Math.floor(Math.random() * (colBlockNumber - 1)) + 1;
    foodLocation.row = foodRow;
    foodLocation.col = foodCol;
 if (counter1 > 1){
        currentFoodBlock[0].classList.remove("food");
    }
    var foodBlock = document.getElementsByClassName("row" + foodLocation.row + " " + "col" + foodLocation.col);
    foodBlock[0].classList.add("food");
    currentFoodBlock = foodBlock;
    counter1 ++;
};
generateFood()
//when snake head touches the food block, one block is added
function grow(foodRow, foodCol){
    if (snake[0].col == foodCol && snake[0].row == foodRow  ){
        if (multiplierOn){
            for(var i = 0; i< 3; i++){
                snake.push({row: snake[snake.length - 1].row, col: snake[snake.length - 1].col});
            }
            score += 3;
        } else {
            snake.push({row: snake[snake.length - 1].row, col: snake[snake.length - 1].col});
            score += 1;
        }
        generateFood();
    }

    if (counter4 == 11) {
        clearInterval(powerActivate);
        isPowerCounterGoing = false;
        multiplierOn = false;
        invincibilityOn = false;
        counter4 = 0;
        document.getElementById("powerupIndicator").innerHTML = "Power Up Active: ";
            if (slowOn) {
               slowOn = false;
               clearInterval(runInterval);
            runInterval = setInterval(function (){
                run(currentDirection);
                document.getElementById("score").innerHTML = "Score: "+ score+"";
                document.querySelector("#highscore").innerHTML = "High Score: "+highScore(score)+"";
        }, 100); 
            }
        }

    if (snake[0].row == tRow && snake[0].col == tCol){
        currentPowerUpBlock[0].classList.remove("powerupBlock");
        
        if (powerUpType == 0 && !isPowerCounterGoing){
            multiplierOn = true;
            isPowerCounterGoing = true;
        powerActivate = setInterval(function(){
            counter4++;
            document.getElementById("powerupIndicator").innerHTML = "Power Up Active: Triple Multiplier " + (11 - counter4) +"";
        }, 1000)
    } else if (powerUpType == 1 && !isPowerCounterGoing){
        invincibilityOn = true;
        isPowerCounterGoing = true;
        powerActivate = setInterval(function(){
            counter4++;
            document.getElementById("powerupIndicator").innerHTML = "Power Up Active: Invincibility " + (11 - counter4) +"";
        }, 1000)
    } else if (powerUpType == 2 && !isPowerCounterGoing){
        clearInterval(runInterval);
        counter4 = -10;
        slowOn = true;
        isPowerCounterGoing = true;
        powerActivate = setInterval(function(){
            counter4++;
            document.getElementById("powerupIndicator").innerHTML = "Power Up Active: Slow " + (11 - counter4) + "";
        }, 1000)
        
        runInterval = setInterval(function (){
        run(currentDirection);
        document.getElementById("score").innerHTML = "Score: "+ score+"";
        document.querySelector("#highscore").innerHTML = "High Score: "+highScore(score)+"";
    }, 200);

    } else if (powerUpType == 3 && !isPowerCounterGoing){
        //Block burn
        fastMode = false;
        clearInterval(runInterval);
           for (var i = 0; i < 6; i++){
                document.getElementsByClassName("row"+snake[snake.length-1-i].row + " col" + snake[snake.length-1-i].col)[0].classList.add("blue");
            }
        setTimeout(function(){
            for (var i = 0; i < 6; i++){
                document.getElementsByClassName("row"+snake[snake.length-1-i].row + " col" + snake[snake.length-1-i].col)[0].classList.remove("blue");
            }
            for (var i = 0; i < 6; i++){
                snake.splice(snake.length - 1, 1);
            }

            counter4 = 7
            isPowerCounterGoing = true;
            powerActivate = setInterval(function(){
                counter4++;
                document.getElementById("powerupIndicator").innerHTML = "Power Up Active: Block Burn ";
            }, 1000)   
        }, 1000)

        setTimeout (function(){
                runInterval = setInterval(function (){
                    run(currentDirection);
                    document.getElementById("score").innerHTML = "Score: "+ score+""; 
                    document.querySelector("#highscore").innerHTML = "High Score: "+highScore(score)+"";
                }, 100);
            }, 2000)
    }   
}

    if (counter2 >= 10) {
        currentPowerUpBlockGlobal[0].classList.remove("powerupBlock");
        tRow,tCol = -1;
    }
}

function removePowerUps(){
    clearInterval(powerInt);
    counter2 = 0;
    powerInt = setInterval(function(){
        counter2++;
    }, 1000)
}

function spawnPowerUps(){
    tRow = Math.floor(Math.random() * (rowBlockNumber - 1)) + 1;
    tCol = Math.floor(Math.random() * (colBlockNumber - 1)) + 1;
    currentPowerUpBlock = document.getElementsByClassName("row" + tRow + " " + "col" + tCol);
    currentPowerUpBlockGlobal = currentPowerUpBlock;
    
    if (snake.length >= 9){
        powerUpType = Math.floor(Math.random() * (4));
    } else {
        powerUpType = Math.floor(Math.random() * (3));
    } 
    currentPowerUpBlock[0].classList.add("powerupBlock");
    removePowerUps();
}

setInterval(function(){
   if (!gameOver && isSnakeMoving ){
   spawnPowerUps(); 
}
}, 30000);

//sets highscore
function highScore(score){
    if (score > highscore) {
        highscore = score;
    } 
    return highscore;
}

function detectDeath(){
var snakeBodyNumber;
    for (snakeBodyNumber in snake) {
       //shows Secret Settings
       if (highscore > 49 && document.getElementById("toggleMode").style.display == "") {
                    document.getElementById("tellSecret").innerHTML = "Press 1 for secret settings";
                }
                //if any of the blocks are touching the head block, interval is killed
        if (snakeBodyNumber > 1){
            if (snake[snakeBodyNumber].col == snake[0].col && snake[snakeBodyNumber].row == snake[0].row && !invincibilityOn && snake.length > 3) {
               isIntervalRunning = false;
               gameOver = true;
               document.querySelector("#restart").innerHTML = "Space to restart";
               clearInterval(runInterval);                
            } 
        }
    }
}
//Moves the snake forward depending on what key is pressed
function removeLink(){
    document.getElementById("explanation").style.display = "none";
}

function toggleModes(){
    if (fastMode == false) {
        document.getElementById("toggleMode").innerHTML = "Turn off superspeed mode";
        fastMode = true;
    } else {
        document.getElementById("toggleMode").innerHTML = "Turn on superspeed mode";
        fastMode = false;
    }
}

document.addEventListener('keydown', function(event) { 
    //after snake dies, press space bar to reset the interval
    if (event.key === " "){
    snakeStart = {row: Math.floor(Math.random() * (rowBlockNumber - 1)) + 1, col: Math.floor(Math.random() * (colBlockNumber - 1)) + 1};
        if (gameOver) {
            gameOver = false;
            isSnakeMoving = false;
            document.querySelector("#restart").innerHTML = " ";
            snakeLocation();
            currentDirection = "stop";
            run(currentDirection);
            multiplierOn = false; invincibilityOn = false;slowOn = false;
            counter4 = 0;
            score = 0;
            document.getElementById("powerupIndicator").innerHTML = "Power Up Active: ";
            isPowerCounterGoing = false;
            clearInterval(powerActivate);
            generateFood();
            currentPowerUpBlockGlobal[0].classList.remove("powerupBlock");

        }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "a" || event.key === "s" || event.key === "d" || event.key === "w"){
        //if the game was just reset, the interval will start on any of the four directional keys
        if (!isIntervalRunning && !gameOver){
            isIntervalRunning = true;
            runInterval = setInterval(function (){
            
            run(currentDirection);
            document.getElementById("score").innerHTML = "Score: "+ score+""; 
            document.querySelector("#highscore").innerHTML = "High Score: "+highScore(score)+"";
        }, 100);
    }
}
	//Sets the motion to the direction once the four directional keys are pressed
    
    if (event.key === "1"){
        document.getElementById("toggleMode").style.display = "inline-block";
        document.getElementById("tellSecret").innerHTML = "";
        document.getElementById("explanation").style.display = "inline-block";
    }
// Left
    if (event.key === "ArrowLeft" && isIntervalRunning || event.key === "a" && isIntervalRunning) {
        if (fastMode){
            run("left"); isSnakeMoving = true;
        } else {
            currentDirection = "left";isSnakeMoving = true;
        }

    // Right
    } else if (event.key === "ArrowRight" && isIntervalRunning ||event.key === "d" && isIntervalRunning) {
        if (fastMode){
            run("right");isSnakeMoving = true;
        } else {
            currentDirection = "right";isSnakeMoving = true;
        }
    // Up
    } else if (event.key === "ArrowUp" && isIntervalRunning || event.key === "w" && isIntervalRunning) {
        if (fastMode){
            run("up");isSnakeMoving = true;
        } else {
            currentDirection = "up";isSnakeMoving = true;
        }   	// Down
    } else if (event.key === "ArrowDown" && isIntervalRunning || event.key === "s" && isIntervalRunning) {
        if (fastMode){
            run("down");isSnakeMoving = true;
        } else {
            currentDirection = "down";isSnakeMoving = true;
        }
}
});
