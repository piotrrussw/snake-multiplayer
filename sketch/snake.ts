class Snake {
    private x: number;
    private y: number;
    private xSpeed: number;
    private ySpeed: number;
    private readonly scale: number;

    constructor(scale: number) {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.scale = scale;
    }

    update(p5: p5) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.x = p5.constrain(this.x, 0, p5.width - this.scale);
        this.y = p5.constrain(this.y, 0, p5.height - this.scale);
    }

    show(p5: p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, this.scale, this.scale);
    }

    dir(x: number, y: number) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    eat() {

    }
}
