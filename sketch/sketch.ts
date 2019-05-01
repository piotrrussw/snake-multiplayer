const sketch = (p: p5) => {
    let snake: Snake;

    p.preload = () => {

    };

    p.setup = () => {
        p.createCanvas(800, 600);
        snake = new Snake();
    };

    p.windowResized = () => {
        p.resizeCanvas(800, 600);
    };

    p.draw = () => {
        p.background('#fff');
        snake.update();
        snake.show(p);
    }
};

const sketchP = new p5(sketch);
