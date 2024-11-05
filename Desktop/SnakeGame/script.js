addEventListener('DOMContentLoaded',function()
{
      const gameArena=this.document.getElementById('game-arena');
      let score=0;
      let gameStarted=false;
      let food={x:300,y:200};
      let snake=[{x:160,y:200},{x:140, y:200},{x:120,y:200}];
      const arenaSize=600;
      const cellSize=20;
      let dx=cellSize;
      let dy=0;
      let intervalId;
     let gameSpeed=200;
     function moveFood() {
      let newX, newY;

      do {
          newX = Math.floor(Math.random() * 30) * cellSize;
          newY = Math.floor(Math.random() * 30) * cellSize;
      } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

      food = { x: newX, y: newY };
  }
      // update snake function
      function updateSnake() {
            const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(newHead); 
    
      
            if(newHead.x === food.x && newHead.y === food.y) {
                score += 10;
                moveFood();
    
                if(gameSpeed > 50) {
                    clearInterval(intervalId);
                    gameSpeed -= 10;
                    gameLoop();
                }
    
            } else {
                snake.pop(); 
            }
        }
      // change direction function
      function changeDirection(e) {
            console.log("key pressed", e);
            const isGoingDown = dy === cellSize;
            const isGoingUp = dy === -cellSize;
            const isGoingRight = dx === cellSize;
            const isGoingLeft = dx === -cellSize;
            if(e.key === 'ArrowUp' && !isGoingDown ) {
                dx = 0;
                dy = -cellSize;
            } else if(e.key === 'ArrowDown' && !isGoingUp) {
                dx = 0;
                dy = cellSize;
            } else if(e.key === 'ArrowLeft' && !isGoingRight) {
                dx = -cellSize;
                dy = 0;
            } else if(e.key === 'ArrowRight' && !isGoingLeft) {
                dx = cellSize;
                dy = 0;
            }
        }
        function drawDiv(x, y, className) {
            const divElement = document.createElement('div');
            divElement.classList.add(className);
            divElement.style.top = `${y}px`;
            divElement.style.left = `${x}px`;
            return divElement;
        }
    
      //   draw food and snake
        function drawFoodAndSnake() {
            gameArena.innerHTML = ''; 
            snake.forEach((snakeCell) => {
                const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake');
                gameArena.appendChild(snakeElement);
            })
    
            const foodElement = drawDiv(food.x, food.y, 'food');
            gameArena.appendChild(foodElement);
        }
    
      //   is game  over function
        function isGameOver() {
         
            for(let i = 1; i < snake.length; i++) {
                if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                    return true;
                }
            }
    
    
            const hitLeftWall = snake[0].x < 0;
            const hitRightWall = snake[0].x > arenaSize - cellSize;
            const hitTopWall = snake[0].y < 0;
            const hitBottomWall = snake[0].y > arenaSize - cellSize;
            return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
        }
      //   game  loop function
        function gameLoop() {
            intervalId = setInterval(() => {
                if(isGameOver()) {
                    clearInterval(intervalId);
                    gameStarted = false;
                    alert('Game Over' + '\n' + 'Your Score: ' + score);
                    return;
                }
                updateSnake();
                drawFoodAndSnake();
                drawScoreBoard();
            }, gameSpeed);
        }
    
      // run game function
      function runGame() {
            if(!gameStarted) {
                gameStarted = true;
                document.addEventListener('keydown', changeDirection);
                
                gameLoop();
            }
        }
    
      //   draw scoreboard function
        function drawScoreBoard() {
            const scoreBoard = document.getElementById('score-board');
            scoreBoard.textContent = `Score: ${score}`;
        }
      //   initiate game function
        function initiateGame() {
            const scoreBoard = document.createElement('div'); 
            scoreBoard.id = 'score-board';
    
            document.body.insertBefore(scoreBoard, gameArena); // Insert score board before game arena
    
    
            const startButton = document.createElement('button');
            startButton.textContent = 'Start Game';
            startButton.classList.add('start-button');
    
            startButton.addEventListener('click', function startGame() {
                startButton.style.display = 'none'; // Hide start button
    
                runGame();
            });
    
            document.body.appendChild(startButton); // Append start button to the body
        }
    
        initiateGame();
})