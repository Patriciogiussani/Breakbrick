import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // Mostrar fondo y barra de progreso
        this.add.image(512, 384, 'background');
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        // Ajustar la ruta de los assets
        this.load.setPath('assets');
        this.load.image('ball', 'ball.png');
        this.load.image('sky', 'sky.jpg');
        this.load.image('brick1', 'brick1.png');
        this.load.image('brick2', 'brick2.png');
        this.load.image('brick3', 'brick3.png');
        this.load.image('logo', 'logo.png');  // Asegúrate de que este asset existe
    }

    create() {
        // Moverse al menú principal después de cargar los assets
        this.scene.start('MainMenu');
    }
}
