const gameboard = document.querySelector("#gameboard");
const scoreTxt = document.querySelector("#score");
const reset = document.querySelector("#reset");
const ctx = gameboard.getContext("2d");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "#1a1b26";
const snakecolor = "#00c0a8";
const snackborder = "black";
const foodcolor ="#1fab9d";
const unitSize = 25;
let running = false;
let Xvelocity = unitSize;
let Yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake =[
    {x:unitSize*2, y:0},
    {x:unitSize*1 ,y:0},
    {x:0 ,y:0}
]
window.addEventListener("keydown",changedirection);
reset.addEventListener("click",resetgame);
document.getElementById("start").addEventListener("click", function() {
    gamestart(); 
    document.getElementById('start').textContent = "Game Started"; 
    document.getElementById('start').disabled = true; 
});


function gamestart(){
    running=true;
    scoreTxt.textContent= score;
    createfood();
    drawfood();
    nexttick();
}
function nexttick(){
    if(running){
        setTimeout(()=>{
        clearboard();
        drawfood();
        movesnake();
        drawsnake();
        checkgameover();
        nexttick();
    },75)}
    else{
        displaygameover();
    }
}
function clearboard(){
    ctx.fillStyle= boardbackground;
    ctx.fillRect(0, 0 ,gamewidth,gameheight)
}
function createfood(){
    function randomfood(min,max){
        const randnum = Math.round((Math.random() * (max-min) + min) /unitSize) * unitSize;
        return randnum;
    }
    foodX = randomfood(0, gamewidth - unitSize)
    foodY = randomfood(0, gamewidth - unitSize)
}
function drawfood(){
    ctx.fillStyle= foodcolor;
   ctx.fillRect(foodX,foodY,unitSize,unitSize)
}
function movesnake(){
    const head= {x:snake[0].x + Xvelocity,
        y:snake[0].y + Yvelocity}
        snake.unshift(head)

        if(snake[0].x == foodX && snake[0].y == foodY){
            score+=1;
            scoreTxt.textContent=score;
            createfood();
        }
        else{
            snake.pop();
        }
    }
function drawsnake(){
    ctx.fillStyle =snakecolor
    
    ctx.stokeStyle = snackborder
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })
}
function changedirection(event){
    const keypress = event.keyCode;
    const goUp = 87;
    const goLeft = 65;
    const goRight= 68;
    const goDown = 83;

    const up = (Yvelocity == -unitSize)
    const down = (Yvelocity == unitSize)
    const left =(Xvelocity == -unitSize)
    const right = (Xvelocity == unitSize)
    switch(true){
        case(keypress == goUp && !down):
            Xvelocity =0;
            Yvelocity= -unitSize;
            break;
            case(keypress == goDown && !up):
                Xvelocity = 0;
                Yvelocity= unitSize;
                break;
                case(keypress == goLeft && !right):
            Xvelocity =-unitSize;
            Yvelocity= 0;
            break;
            case(keypress == goRight && !left):
                Xvelocity =unitSize ;
                Yvelocity= 0;
                break;
            } 
    }

function checkgameover(){
    switch(true){
        case(snake[0].x < 0):
        running=false
        break;
        case(snake[0].x >= gamewidth):
        running=false
        break;
        case(snake[0].y < 0):
        running=false
        break;
        case(snake[0].y >= gameheight):
        running=false
        break;
    }
    for(let i =1 ; i< snake.length ; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y== snake[0].y){
            running=false
        }
    }
}
function displaygameover(){
    ctx.font="50px minec";
    ctx.fillStyle="#00c0a8";
    ctx.textAlign="center";
    ctx.fillText ("Game Over", gameheight/2,gamewidth/2)
    running = false
}
function resetgame(){
    score=0;
    Xvelocity= unitSize;
    Yvelocity= 0;
    snake =[
        {x:unitSize*2, y:0},
        {x:unitSize*1 ,y:0},
        {x:0 ,y:0}
    ]
        gamestart();
}