export class WallBrick extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.createWall();
    }

    createWall() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 6; j++) {
                let brick = this.scene.add.rectangle(
                    40 + i * 70,
                    40 + j * 30,
                    60,    // ancho del ladrillo
                    20,    // alto del ladrillo
                    0x666666 // color gris
                );

                this.scene.physics.add.existing(brick, true);
                this.add(brick);
            }
        }
    }
}
