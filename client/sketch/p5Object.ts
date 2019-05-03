interface P5Object {
    x: number,
    y: number,
    readonly scale: number,
    draw(p5: p5): any,
    setup(p5: p5): any
}
