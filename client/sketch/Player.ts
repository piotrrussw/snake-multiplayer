///<reference path="Snake.ts"/>
class Player extends Snake {
    /**
     * @param curr - current (x, y) direction
     * @param next - next (x, y) direction
     */
    private isMovingBackward = (curr: Array<number>, next: Array<number>): boolean => curr[0] === (next[0] * -1) || curr[1] === (next[1] * -1);

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

    getData(): any {
        return {
            x: this.x,
            y: this.y,
            xSpeed: this.xSpeed,
            ySpeed: this.ySpeed,
            scale: this.scale,
            tail: this.tail,
            total: this.total
        }
    }

    private direction(x: number, y: number) {
        this.xSpeed = x;
        this.ySpeed = y;
    }
}
