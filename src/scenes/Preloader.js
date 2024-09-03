import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(512, 384, 'background');
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('ball', 'ball.png');
        this.load.image('sky', 'sky.jpg');
        this.load.image('brick1', 'brick1.png');
        this.load.image('brick2', 'brick2.png');
        this.load.image('brick3', 'brick3.png');
        this.load.image('logo', 'logo.png');
    }

    create() {
        this.scene.start('MainMenu');
    }
}
