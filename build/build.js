var Food = (function () {
    function Food(scale) {
        this.scale = scale;
    }
    Food.prototype.setup = function (p5) {
        this.x = p5.random(p5.width);
        this.y = p5.random(p5.height);
        p5.createVector(this.x, this.y);
    };
    Food.prototype.draw = function (p5) {
        p5.fill(255, 0, 100);
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    return Food;
}());
var gameScale = 20;
var sketch = function (p) {
    var snake;
    var food;
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(800, 600);
        p.frameRate(30);
        snake = new Snake(gameScale);
        food = new Food(gameScale);
        food.setup(p);
        food.draw(p);
    };
    p.windowResized = function () {
        p.resizeCanvas(800, 600);
    };
    p.draw = function () {
        p.background('#fff');
        snake.update(p);
        snake.show(p);
    };
    p.keyPressed = function () {
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
var sketchP = new p5(sketch);
var Snake = (function () {
    function Snake(scale) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
    }
    Snake.prototype.update = function (p5) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    };
    Snake.prototype.show = function (p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Snake.prototype.dir = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    };
    return Snake;
}());
//# sourceMappingURL=build.js.map