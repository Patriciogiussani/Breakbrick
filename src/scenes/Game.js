import { Scene } from 'phaser';
import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';
import { Brick } from '../entities/Brick';
import { WallBrick } from '../entities/Wallbrick';
import { Control } from '../components/Control';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.add.image(512, 384, 'sky').setScale(1.7);

        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#000' });

        this.paddle = new Paddle(this, 512, 700, 100, 20, 0x6666ff);
        this.ball = new Ball(this, 512, 400, 'ball', 0.2);
        
        // Añadir WallBricks al juego
        this.wallBricks = new WallBrick(this);

        this.bricks = this.physics.add.staticGroup();

        const rows = 5;
        const cols = 11;
        const brickWidth = 90;
        const brickHeight = 40;
        const offsetX = (this.scale.width - (cols * brickWidth)) / 2;
        const offsetY = 50;
        const brickTextures = ['brick1', 'brick2', 'brick3'];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = offsetX + col * brickWidth;
                let y = offsetY + row * brickHeight;
                let texture = brickTextures[Phaser.Math.Between(0, brickTextures.length - 1)];
                new Brick(this, x, y, texture, 0.5);
            }
        }

        this.control = new Control(this, this.paddle);

        this.physics.add.collider(this.paddle, this.ball);
        this.physics.add.collider(this.ball, this.bricks, this.handleCollision, null, this);
        this.physics.add.collider(this.ball, this.wallBricks, this.handleCollision, null, this);

        this.physics.world.on('worldbounds', (body, up, down) => {
            if (down && body.gameObject === this.ball) {
                this.scene.start('GameOver', { score: this.score });
            }
        });
    }

    update() {
        this.control.update();
    }

    handleCollision(ball, brick) {
        brick.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.bricks.countActive() === 0) {
            this.ball.resetBall();
        }
    }
}
