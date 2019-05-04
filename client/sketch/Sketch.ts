const sketch = (p: p5) => {
    let socket: any;
    const gameScale = 20;
    let player: Player;
    let opponents: any = {};
    let food: Food;

    p.preload = () => {

    };

    p.setup = () => {
        const canvas = p.createCanvas(800, 500);
        // canvas.parent('sketch');
        p.frameRate(10);
        // @ts-ignore
        socket = io(`http://localhost:${process.env.PORT || 3000}`);

        player = new Player(gameScale);
        food = new Food(gameScale);

        socket.on('message', (data: any, foodData: any, highScore: number) => {
            console.log(data, foodData);
            Object.keys(data).forEach((id: string) => {

                if (Object.keys(data[id]).length) {
                    opponents[id] = new Snake(gameScale);
                    opponents[id].update(data[id]);
                } else {
                    opponents[id] = new Snake(gameScale);
                }
            });

            if (!Object.keys(opponents).length) {
                food.setup(p);
                socket.emit('food', food.getData());
            } else {
                food.update(p, foodData);
            }

            player.setScore(highScore);
            player.mountHighScore();
        });

        socket.on('disconnect', (id: string) => {
            opponents.hasOwnProperty(id)
                ? delete opponents[id]
                : null;
        });

        socket.on('newConnection', (id: string) => {
            opponents[id] = new Snake(gameScale);
        });

        socket.on('move', (data: any, id: string) => {
            console.log('on move', data);
            opponents[id].update(data);
        });

        socket.on('food', (data: any) => {
            return food.update(p, data);
        });

        socket.on('highScore', (score: number) => {
            player.setScore(score);
        });
    };

    p.windowResized = () => {
        p.resizeCanvas(800, 500);
    };

    p.draw = () => {
        p.background('#fff');
        player.setup(p);
        player.draw(p);

        Object.keys(opponents).forEach((id: string) => {
            // noinspection TypeScriptValidateJSTypes
            opponents[id].setup(p);
            // noinspection TypeScriptValidateJSTypes
            opponents[id].draw(p);
        });

        food.draw(p);

        if (player.eat(food, p)) {
            food.setup(p);
            food.draw(p);

            socket.emit('highScore', player.getScore());
            socket.emit('food', food.getData());
        }

        socket.emit('move', player.getData());
    };

    p.keyPressed = () => {
        player.move(p.keyCode);
    };
};

// noinspection JSPotentiallyInvalidConstructorUsage
new p5(sketch);
