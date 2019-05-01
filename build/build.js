var Food = (function () {
    function Food(scale) {
        this.scale = scale;
    }
    Food.prototype.setup = function (p5) {
        var cols = p5.floor(p5.width / this.scale);
        var rows = p5.floor(p5.height / this.scale);
        var vector = p5.createVector(p5.floor(p5.random(cols)), p5.floor(p5.random(rows)));
        vector.mult(this.scale);
        this.x = vector.x;
        this.y = vector.y;
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
        p.frameRate(10);
        snake = new Snake(gameScale);
        food = new Food(gameScale);
        food.setup(p);
    };
    p.draw = function () {
        p.background('#fff');
        snake.setup(p);
        snake.draw(p);
        food.draw(p);
        if (snake.eat(food, p)) {
            console.log('eating food');
            food.setup(p);
            food.draw(p);
        }
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
    Snake.prototype.setup = function (p5) {
        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;
        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    };
    Snake.prototype.draw = function (p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Snake.prototype.dir = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    };
    Snake.prototype.eat = function (food, p5) {
        return p5.dist(this.x, this.y, food.x, food.y) < 1;
    };
    return Snake;
}());
//# sourceMappingURL=build.js.map