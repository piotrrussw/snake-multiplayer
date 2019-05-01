class Snake implements P5 {
    x: number;
    y: number;
    readonly scale: number;
    private xSpeed: number;
    private ySpeed: number;

    constructor(scale: number) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
    }

    setup(p5: p5) {
        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;

        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    }

    draw(p5: p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, this.scale, this.scale);
    }

    dir(x: number, y: number) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    eat(food: Food, p5: p5) {
        return p5.dist(this.x, this.y, food.x, food.y) < 1;
    }
}
