class Snake implements P5Object {
    x: number;
    y: number;
    highScore: number = 0;
    readonly scale: number;
    protected xSpeed: number;
    protected ySpeed: number;
    protected total: number = 0;
    protected tail: Array<any> = [];

    constructor(args: any) {
        if (typeof args === 'number') {
            this.scale = args;
            this.x = 0;
            this.y = 0;
            this.xSpeed = 1;
            this.ySpeed = 0;
        } else {
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

    setup(p5: p5) {
        this.death(p5);

        if (this.total === this.tail.length) {
            this.tail.shift();
        }

        this.tail[this.total - 1] = {x: this.x, y: this.y};

        this.x += this.xSpeed * this.scale;
        this.y += this.ySpeed * this.scale;

        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    }

    draw(p5: p5) {
        p5.fill('#969696');
        this.tail.forEach(({x, y}) => p5.rect(x, y, this.scale, this.scale));

        p5.rect(this.x, this.y, this.scale, this.scale);
    }

    update(args: any) {
        this.x = args.x;
        this.y = args.y;
        this.xSpeed = args.xSpeed;
        this.ySpeed = args.ySpeed;
        this.tail = args.tail;
        this.total = args.total;
        this.highScore = args.highScore;
    }

    private death(p5: p5) {
        if (this.tail.some(({x, y}) => p5.dist(this.x, this.y, x, y) < 1)) {
            this.total = 0;
            this.tail = [];
        }
    }
}
