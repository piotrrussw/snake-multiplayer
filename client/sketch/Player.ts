///<reference path="Snake.ts"/>
class Player extends Snake {
    /**
     * @param curr - current (x, y) direction
     * @param next - next (x, y) direction
     */
    private _moved: boolean = false;
    private isMovingBackward = (curr: Array<number>, next: Array<number>): boolean => curr[0] === (next[0] * -1) || curr[1] === (next[1] * -1);

    eat(food: Food, p5: p5) {
        if (p5.dist(this.x, this.y, food.x, food.y) < 1) {
            this.total++;
            this.mountTotal();

            if (this.highScore < this.total) {
                this.highScore = this.total;
                this.mountHighScore();
            }

            return true;
        }

        return false;
    }


    draw(p5: p5) {
        super.draw(p5);
        p5.fill('#fff');
        this.tail.forEach(({x, y}) => p5.rect(x, y, this.scale, this.scale));

        p5.rect(this.x, this.y, this.scale, this.scale);
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
            tail: this.tail,
            total: this.total,
            highScore: this.highScore
        }
    }

    getScore() {
        return this.total;
    }

    setScore(score: number) {
        this.highScore = score;
        this.mountHighScore();
    }

    private direction(x: number, y: number) {
        this._moved = true;
        this.xSpeed = x;
        this.ySpeed = y;
    }

    mountTotal() {
        document.getElementById('player-score').innerText = this.total.toString();
    }

    mountHighScore() {
        document.getElementById('high-score').innerText = this.highScore.toString();
    }

    get moved(): boolean {
        return this._moved;
    }

    set moved(value: boolean) {
        this._moved = value;
    }
}
