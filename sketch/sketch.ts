const gameScale = 20;
const sketch = (p: p5) => {
    let snake: Snake;
    let food: Food;

    p.preload = () => {

    };

    p.setup = () => {
        p.createCanvas(800, 600);
        p.frameRate(30);

        snake = new Snake(gameScale);
        food = new Food(gameScale);
    };

    p.windowResized = () => {
        p.resizeCanvas(800, 600);
    };

    p.draw = () => {
        p.background('#fff');
        snake.update(p);
        snake.show(p);

        food.setup(p);
        food.draw(p);
    };

    p.keyPressed = () => {
        switch (p.keyCode) {
            case 37:
                snake.dir(-1, 0);
                break;
            case 38:
                snake.dir(0, -1);
                break;
            case 39:
                snake.dir(1, 0);
                break;
            case 40:
                snake.dir(0, 1);
                break;
        }
    };
};

const sketchP = new p5(sketch);
