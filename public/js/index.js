var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 37] = "LEFT";
    Direction[Direction["UP"] = 38] = "UP";
    Direction[Direction["RIGHT"] = 39] = "RIGHT";
    Direction[Direction["DOWN"] = 40] = "DOWN";
})(Direction || (Direction = {}));
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
        p5.fill('#F43706');
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Food.prototype.update = function (p5, data) {
        this.x = data.x;
        this.y = data.y;
    };
    Food.prototype.getData = function () {
        return {
            x: this.x,
            y: this.y,
            scale: this.scale
        };
    };
    return Food;
}());
var Snake = (function () {
    function Snake(args) {
        this.highScore = 0;
        this.total = 0;
        this.tail = [];
        if (typeof args === 'number') {
            this.scale = args;
            this.x = 0;
            this.y = 0;
            this.xSpeed = 1;
            this.ySpeed = 0;
        }
        else {
            this.x = args.x;
            this.y = args.y;
            this.xSpeed = args.xSpeed;
            this.ySpeed = args.ySpeed;
            this.total = args.total;
            this.tail = args.tail;
            this.scale = args.scale;
            this.highScore = args.highScore;
        }
    }
    Snake.prototype.setup = function (p5) {
        this.death(p5);
        if (this.total === this.tail.length) {
            this.tail.shift();
        }
        this.tail[this.total - 1] = { x: this.x, y: this.y };
        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;
        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    };
    Snake.prototype.draw = function (p5) {
        var _this = this;
        p5.fill('#969696');
        this.tail.forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return p5.rect(x, y, _this.scale, _this.scale);
        });
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Snake.prototype.update = function (args) {
        this.x = args.x;
        this.y = args.y;
        this.xSpeed = args.xSpeed;
        this.ySpeed = args.ySpeed;
        this.tail = args.tail;
        this.total = args.total;
        this.highScore = args.highScore;
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
    return Snake;
}());
var Opponent = (function (_super) {
    __extends(Opponent, _super);
    function Opponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Opponent;
}(Snake));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._moved = false;
        _this.isMovingBackward = function (curr, next) { return curr[0] === (next[0] * -1) || curr[1] === (next[1] * -1); };
        return _this;
    }
    Player.prototype.eat = function (food, p5) {
        if (p5.dist(this.x, this.y, food.x, food.y) < 1) {
            this.total++;
            this.mountTotal();
            if (this.highScore < this.total) {
                this.highScore = this.total;
                this.mountHighScore();
            }
            return true;
        }
        return false;
    };
    Player.prototype.draw = function (p5) {
        var _this = this;
        _super.prototype.draw.call(this, p5);
        p5.fill('#fff');
        this.tail.forEach(function (_a) {
            var x = _a.x, y = _a.y;
            return p5.rect(x, y, _this.scale, _this.scale);
        });
        p5.rect(this.x, this.y, this.scale, this.scale);
    };
    Player.prototype.move = function (key) {
        switch (key) {
            case Direction.LEFT:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [-1, 0])
                    ? this.direction(-1, 0)
                    : null;
                break;
            case Direction.UP:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [0, -1])
                    ? this.direction(0, -1)
                    : null;
                break;
            case Direction.RIGHT:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [1, 0])
                    ? this.direction(1, 0)
                    : null;
                break;
            case Direction.DOWN:
                !this.isMovingBackward([this.xSpeed, this.ySpeed], [0, 1])
                    ? this.direction(0, 1)
                    : null;
                break;
        }
    };
    Player.prototype.getData = function () {
        return {
            x: this.x,
            y: this.y,
            xSpeed: this.xSpeed,
            ySpeed: this.ySpeed,
            tail: this.tail,
            total: this.total,
            highScore: this.highScore
        };
    };
    Player.prototype.getScore = function () {
        return this.total;
    };
    Player.prototype.setScore = function (score) {
        this.highScore = score;
        this.mountHighScore();
    };
    Player.prototype.direction = function (x, y) {
        this._moved = true;
        this.xSpeed = x;
        this.ySpeed = y;
    };
    Player.prototype.mountTotal = function () {
        document.getElementById('player-score').innerText = this.total.toString();
    };
    Player.prototype.mountHighScore = function () {
        document.getElementById('high-score').innerText = this.highScore.toString();
    };
    Object.defineProperty(Player.prototype, "moved", {
        get: function () {
            return this._moved;
        },
        set: function (value) {
            this._moved = value;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(Snake));
var sketch = function (p) {
    var socket;
    var gameScale = 20;
    var player;
    var opponents = {};
    var food;
    p.preload = function () {
    };
    p.setup = function () {
        var canvas = p.createCanvas(800, 500);
        p.frameRate(10);
        socket = io("http://localhost:" + (process.env.PORT || 3000));
        player = new Player(gameScale);
        food = new Food(gameScale);
        socket.on('message', function (data, foodData, highScore) {
            console.log(data, foodData);
            Object.keys(data).forEach(function (id) {
                if (Object.keys(data[id]).length) {
                    opponents[id] = new Snake(gameScale);
                    opponents[id].update(data[id]);
                }
                else {
                    opponents[id] = new Snake(gameScale);
                }
            });
            if (!Object.keys(opponents).length) {
                food.setup(p);
                socket.emit('food', food.getData());
            }
            else {
                food.update(p, foodData);
            }
            player.setScore(highScore);
            player.mountHighScore();
        });
        socket.on('disconnect', function (id) {
            opponents.hasOwnProperty(id)
                ? delete opponents[id]
                : null;
        });
        socket.on('newConnection', function (id) {
            opponents[id] = new Snake(gameScale);
        });
        socket.on('move', function (data, id) {
            console.log('on move', data);
            opponents[id].update(data);
        });
        socket.on('food', function (data) {
            return food.update(p, data);
        });
        socket.on('highScore', function (score) {
            player.setScore(score);
        });
    };
    p.windowResized = function () {
        p.resizeCanvas(800, 500);
    };
    p.draw = function () {
        p.background('#fff');
        player.setup(p);
        player.draw(p);
        Object.keys(opponents).forEach(function (id) {
            opponents[id].setup(p);
            opponents[id].draw(p);
        });
        food.draw(p);
        if (player.eat(food, p)) {
            food.setup(p);
            food.draw(p);
            socket.emit('highScore', player.getScore());
            socket.emit('food', food.getData());
        }
        socket.emit('move', player.getData());
    };
    p.keyPressed = function () {
        player.move(p.keyCode);
    };
};
new p5(sketch);
//# sourceMappingURL=index.js.map