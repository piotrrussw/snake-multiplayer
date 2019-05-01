var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function (p) {
    };
    Morph.prototype.recalc = function (p) {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function (p) {
        this.recalc(p);
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(4);
        p.beginShape();
        p.noFill();
        p.stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            p.vertex(v.x, v.y);
        }
        p.endShape(p.CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (p, size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(p.radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (p, size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(p.createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(p.createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(p.createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(p.createVector(-size, y));
        }
        return points;
    };
    Shapes.star = function (p, x, y, radius1, radius2, npoints) {
        var angle = p.TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < p.TWO_PI; a += angle) {
            var sx = x + p.cos(a) * radius2;
            var sy = y + p.sin(a) * radius2;
            points.push(p.createVector(sx, sy));
            sx = x + p.cos(a + halfAngle) * radius1;
            sy = y + p.sin(a + halfAngle) * radius1;
            points.push(p.createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var sketch = function (p) {
    var snake;
    p.preload = function () {
    };
    p.setup = function () {
        p.createCanvas(800, 600);
        snake = new Snake();
    };
    p.windowResized = function () {
        p.resizeCanvas(800, 600);
    };
    p.draw = function () {
        p.background('#fff');
        snake.update();
        snake.show(p);
    };
};
var sketchP = new p5(sketch);
var Snake = (function () {
    function Snake() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }
    Snake.prototype.update = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };
    Snake.prototype.show = function (p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, 10, 10);
    };
    return Snake;
}());
//# sourceMappingURL=build.js.map