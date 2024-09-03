export class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, scale = 1) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);
        this.body.setVelocity(400, 400);
        this.setScale(scale);
    }

    resetBall() {
        this.body.setVelocity(400, 400);
        this.setPosition(512, 384);
    }
}
