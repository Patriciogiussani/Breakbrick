export class Control {
    constructor(scene, paddle) {
        this.scene = scene;
        this.paddle = paddle;
        this.cursor = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursor.left.isDown) {
            this.paddle.body.setVelocityX(-300);
        } else if (this.cursor.right.isDown) {
            this.paddle.body.setVelocityX(300);
        } else {
            this.paddle.body.setVelocityX(0);
        }

        if (this.paddle.x < this.paddle.width / 2) {
            this.paddle.x = this.paddle.width / 2;
        } else if (this.paddle.x > this.scene.scale.width - this.paddle.width / 2) {
            this.paddle.x = this.scene.scale.width - this.paddle.width / 2;
        }
    }
}
