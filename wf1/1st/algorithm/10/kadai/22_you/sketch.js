let scene = 'title';

let gridSize = 20;

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }

]

let direction = 'right'


let foods = ['🥗', '🫑', '🥦', '🌽', '🥑', '🥒', '🍏', '🧃']

let food = {};



let defen = 0;
function setup() {

    new Canvas(800, 600)
}


function draw() {
    if (scene == 'title') {
        drawTitle()
    } else if (scene == 'game') {
        drawGame()
    } else if (scene == 'result') {
        drawResult()
    }


}


// function initResult() {
//     allSprites.removeAll();
// }

function drawTitle() {
    background('black')

    textSize(50)
    fill('#fff')
    textAlign(CENTER)
    text('ヘビゲーム', width / 2, height / 2);

    textSize(30)
    fill('#fff')
    textAlign(CENTER)
    text('スペースキーでスタートする', width / 2, height / 2 + 60);


    textSize(20)
    fill('#C8E6C9')
    textAlign(CENTER)
    text('操作方向', width / 2, height / 2 + 170);
    text('方向キー（↑↓←→）でヘビを操作します', width / 2, height / 2 + 200);


    if (kb.presses('space')) {
        initGame()
        scene = 'game'
    }

}

function initGame() {

    // initResult()
    // new Sprite(width / 2, height / 2, 50)
    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }

    ]
    // 蛇的坐标初始化


    food.x = floor(random(width / gridSize)) * gridSize;
    food.y = floor(random(height / gridSize)) * gridSize;
    food.emoji = random(foods);



}


function drawGame() {
    background('#c8e6c9')

    wangge()

    sheshen();

    fangxiangshezhi()
    if (frameCount % 10 == 0) {
        shedong()

        zhuangziji()


        zhuangqiang()
    }

    shiwu()



    if (kb.presses('enter')) {
        drawResult()
        scene = 'result'
    }
    textSize(30)
    textAlign(RIGHT)
    text('Score:' + defen, width - 30, 30)
}



function wangge() {
    noFill();
    stroke(100);
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            square(x, y, gridSize)
        }
    }
}


function sheshen() {
    for (let i = 0; i < snake.length; i++) {

        if (i == 0) { fill('green') } else { fill('black') }
        square(snake[i].x, snake[i].y, gridSize)
    }
}

function fangxiangshezhi() {

    if (kb.presses('right') && direction != 'left') {
        direction = 'right'
    }

    if (kb.presses('left') && direction != 'right') {
        direction = 'left'
    }

    if (kb.presses('up') && direction != 'down') {
        direction = 'up'
    }

    if (kb.presses('down') && direction != 'up') {
        direction = 'down'
    }
}
function shedong() {
    let head = snake[0];
    let newHead;

    // 这里只是给新蛇头一个坐标，下面的unshift（newhead）才是生成方块的作用
    if (direction == 'right') {
        newHead = {
            x: head.x + gridSize,
            y: head.y
        }
    }

    if (direction == 'left') {
        newHead = {
            x: head.x - gridSize,
            y: head.y
        }
    }

    if (direction == 'up') {
        newHead = {
            x: head.x,
            y: head.y - gridSize
        }
    }

    if (direction == 'down') {
        newHead = {
            x: head.x,
            y: head.y + gridSize
        }
    }

    snake.unshift(newHead)

    if (newHead.x == food.x && newHead.y == food.y) {


        food.x = floor(random(width / gridSize)) * gridSize;
        food.y = floor(random(height / gridSize)) * gridSize;
        food.emoji = random(foods);

        defen++;
    } else {
        snake.pop()
    }




}


function shiwu() {
    textSize(25)
    textAlign(CENTER, CENTER);
    text(food.emoji, food.x + gridSize / 2, food.y + gridSize / 2)
}


function zhuangqiang() {
    let head = snake[0]
    if (head.x >= width || head.x < 0 || head.y >= height || head.y < 0) {
        scene = 'result'
    }
}


function zhuangziji() {
    let head = snake[0]
    for (let i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            scene = 'result'
        }
    }
}




function drawResult() {
    // initResult()
    background('black')


    textSize(50)
    fill('#fff')
    textAlign(CENTER)
    text('ゲームオーバー', width / 2, height / 2)


    textSize(30)
    fill('#c8e6c9')
    textAlign(CENTER)
    text('Enterキーを押してもう一度プレイ', width / 2, height / 2 + 60)


    if (kb.presses('enter')) {
        // initResult()
        scene = 'title'
    }

}