const sketch = (p: p5) => {
    let socket: any;
    const gameScale = 20;
    let player: Player;
    let opponents: any = {};
    let food: Food;

    p.preload = () => {

    };

    p.setup = () => {
        p.createCanvas(800, 600);
        p.frameRate(10);
        // @ts-ignore
        socket = io('http://localhost:3000');

        player = new Player(gameScale);
        food = new Food(gameScale);
        food.setup(p);

        socket.on('message', (data: any) => {
            Object.keys(data).forEach((id: string) => {
                Object.keys(data[id]).length
                    ? opponents[id] = new Snake(data[id])
                    : opponents[id] = new Snake(gameScale);
            });
        });

        socket.on('disconnect', (id: string) => {
            opponents.hasOwnProperty(id)
                ? delete opponents[id]
                : null;
        });

        socket.on('newConnection', (id: string) => {
            opponents[id] = new Snake(gameScale);
        });
    };

    p.windowResized = () => {
        p.resizeCanvas(800, 600);
    };

    p.draw = () => {
        p.background('#fff');
        player.setup(p);
        player.draw(p);

        Object.keys(opponents).forEach((id: string) => {
            opponents[id].setup(p);
            opponents[id].draw(p);
        });

        food.draw(p);

        if (player.eat(food, p)) {
            food.setup(p);
            food.draw(p);
        }

        // console.log('Sending player data...');
        // socket.emit('draw', player.getData());
    };

    p.keyPressed = () => {
        player.move(p.keyCode);
    };
};

// noinspection JSPotentiallyInvalidConstructorUsage
new p5(sketch);
