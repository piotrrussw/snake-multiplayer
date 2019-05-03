class Snake implements P5Object {
    x: number;
    y: number;
    highScore: number = 0;
    readonly scale: number;
    private xSpeed: number;
    private ySpeed: number;
    private total: number = 0;
    private tail: Array<any> = [];

    /**
     * @param curr - current (x, y) direction
     * @param next - next (x, y) direction
     */
    private isMovingBackward = (curr: Array<number>, next: Array<number>): boolean => curr[0] === (next[0] * -1) || curr[1] === (next[1] * -1);

    constructor(scale: number) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
    }

    setup(p5: p5) {
        this.death(p5);

        if (this.total === this.tail.length) {
            this.tail.shift();
        }

        this.tail[this.total - 1] = p5.createVector(this.x, this.y);

        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;

        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    }

    draw(p5: p5) {
        p5.fill('255');

        this.tail.forEach(({x, y}) => p5.rect(x, y, this.scale, this.scale));

        p5.rect(this.x, this.y, this.scale, this.scale);
    }

    eat(food: Food, p5: p5) {
        if (p5.dist(this.x, this.y, food.x, food.y) < 1) {
            this.total++;
            this.highScore < this.total ? this.highScore = this.total : null;

            return true;
        }

        return false;
    }

    move(key: number) {
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
    }

    private death(p5: p5) {
        if (this.tail.some(({x, y}) => p5.dist(this.x, this.y, x, y) < 1)) {
            this.total = 0;
            this.tail = [];
        }
    }

    private direction(x: number, y: number) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
}
