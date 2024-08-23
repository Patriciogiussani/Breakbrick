import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        // Añadir fondo
        this.add.image(512, 384, 'sky').setScale(1.5);
    
        // Inicializar el puntaje
        this.score = 0;
    
        // Crear un texto para mostrar el puntaje con color negro
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#000' });
    
        // Crear pala como rectángulo
        this.paddle = this.add.rectangle(512, 700, 100, 20, 0x6666ff);
        this.physics.add.existing(this.paddle);
        this.paddle.body.setImmovable(true);
        this.paddle.body.setCollideWorldBounds(true);
        this.paddle.body.setAllowGravity(false);
    
        // Crear bola como sprite utilizando la imagen cargada
        this.ball = this.add.sprite(512, 400, 'ball');
        this.ball.setScale(0.2);
        this.physics.add.existing(this.ball);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setVelocity(400, 400);
    
        // Crear un grupo estático para los obstáculos
        this.bricks = this.physics.add.staticGroup();
    
        // Añadir múltiples obstáculos al grupo con imágenes variadas y tamaño reducido
        const bricks = ['brick1', 'brick2', 'brick3'];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 7; col++) {
                let x = 160 + col * 100;
                let y = 100 + row * 50;
                let brickImage = bricks[Phaser.Math.Between(0, bricks.length - 1)];
                let obstacle = this.bricks.create(x, y, brickImage).setScale(0.5);
                obstacle.refreshBody();
            }
        }
    
        // Agregar colisiones
        this.physics.add.collider(this.paddle, this.ball, null, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.handleCollision, null, this);
    
        // Detectar colisión de la pelota con el límite inferior
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (down && body.gameObject === this.ball) {
                this.scene.start('GameOver'); // Pasar a la escena de "Game Over"
            }
        });
    
        // Crear cursor
        this.cursor = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        this.paddle.x = this.input.activePointer.x;
    
        if (this.paddle.x < this.paddle.width / 2) {
            this.paddle.x = this.paddle.width / 2;
        } else if (this.paddle.x > this.scale.width - this.paddle.width / 2) {
            this.paddle.x = this.scale.width - this.paddle.width / 2;
        }
    }
    
    handleCollision(ball, brick) {
        brick.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }
}
