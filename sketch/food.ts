class Food {
    private x: number;
    private y: number;
    private readonly scale: number;

    constructor(scale: number) {
        this.scale = scale;
    }

    setup(p5: p5) {
        this.x = p5.random(p5.width);
        this.y = p5.random(p5.height);

        p5.createVector(this.x, this.y);
    }

    draw(p5: p5) {
        p5.fill(255, 0, 100);
        p5.rect(this.x, this.y, this.scale, this.scale);
    }
}
