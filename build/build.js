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
            food.setup(p);
            food.draw(p);
        }
    };
    p.keyPressed = function () {
        snake.move(p.keyCode);
    };
};
var sketchP = new p5(sketch);
var Snake = (function () {
    function Snake(scale) {
        this.total = 0;
        this.tail = [];
        this.isMovingBackward = function (curr, next) { return curr[0] === (next[0] * -1) || curr[1] === (next[1] * -1); };
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
    }
    Snake.prototype.setup = function (p5) {
        this.death(p5);
        if (this.total === this.tail.length) {
            this.tail.shift();
        }
        this.tail[this.total - 1] = p5.createVector(this.x, this.y);
        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;
        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    };
    Snake.prototype.draw = function (p5) {
        var _this = this;
        p5.fill(255);
        this.tail.forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return p5.rect(x, y, _this.scale, _this.scale);
        });
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Snake.prototype.eat = function (food, p5) {
        if (p5.dist(this.x, this.y, food.x, food.y) < 1) {
            this.total++;
            return true;
        }
        return false;
    };
    Snake.prototype.move = function (key) {
        switch (key) {
            case 37:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [-1, 0])
                    ? this.direction(-1, 0)
                    : null;
                break;
            case 38:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [0, -1])
                    ? this.direction(0, -1)
                    : null;
                break;
            case 39:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [1, 0])
                    ? this.direction(1, 0)
                    : null;
                break;
            case 40:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [0, 1])
                    ? this.direction(0, 1)
                    : null;
                break;
        }
    };
    Snake.prototype.death = function (p5) {
        var _this = this;
        if (this.tail.some(function (_a) {
            var x = _a.x, y = _a.y;
            return p5.dist(_this.x, _this.y, x, y) < 1;
        })) {
            this.total = 0;
            this.tail = [];
        }
    };
    Snake.prototype.direction = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    };
    return Snake;
}());
//# sourceMappingURL=build.js.map