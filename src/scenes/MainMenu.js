import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Añadir el fondo y otros elementos del menú
        this.add.image(512, 384, 'background');

        // Añadir el logo si es parte del menú
        this.add.image(512, 300, 'logo');

        // Añadir el texto del menú
        this.add.text(512, 460, 'Main Menu', {
            fontFamily: 'Arial Black', 
            fontSize: 38, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Configurar el evento de clic para iniciar la escena 'Game'
        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
