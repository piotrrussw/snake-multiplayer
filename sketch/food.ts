class Food implements P5 {
    x: number;
    y: number;
    readonly scale: number;

    constructor(scale: number) {
        this.scale = scale;
    }

    setup(p5: p5) {
        const cols = p5.floor(p5.width / this.scale);
        const rows = p5.floor(p5.height / this.scale);
        let vector = p5.createVector(p5.floor(p5.random(cols)), p5.floor(p5.random(rows)))

        vector.mult(this.scale);

        this.x = vector.x;
        this.y = vector.y;
    }

    draw(p5: p5) {
        p5.fill(255, 0, 100);
        p5.rect(this.x, this.y, this.scale, this.scale);
    }
}
