const gameScale = 20;
console.log('GAME IS RUNNING');
const sketch = (p: p5) => {
    let snake: Snake;
    let food: Food;

    p.preload = () => {

    };

    p.setup = () => {
        p.createCanvas(800, 600);
        p.frameRate(10);

        snake = new Snake(gameScale);
        food = new Food(gameScale);
        food.setup(p);
    };

    // p.windowResized = () => {
    //     p.resizeCanvas(600, 600);
    // };

    p.draw = () => {
        // p.background('#A7D948');
        p.background('#fff');
        snake.setup(p);
        snake.draw(p);

        food.draw(p);

        if (snake.eat(food, p)) {
            food.setup(p);
            food.draw(p);
        }
    };

    p.keyPressed = () => {
        snake.move(p.keyCode);
    };
};

const sketchP = new p5(sketch);
