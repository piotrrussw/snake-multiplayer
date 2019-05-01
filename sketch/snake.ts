class Snake {
    private x: number;
    private y: number;
    private xSpeed: number;
    private ySpeed: number;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    show(p5: p5) {
        p5.fill(255);
        p5.rect(this.x, this.y, 10, 10);
    }
}
