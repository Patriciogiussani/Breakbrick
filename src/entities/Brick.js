export class Brick extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, scale = 1) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.setScale(scale);
    }
}
