// preload.js

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('preload');
  }

  preload() {
    // Load images
    this.load.image('ship', 'assets/sprites/ship.png');
    this.load.image('asteroid', 'assets/sprites/asteroid.png');
    
    // Load spritesheets 
    this.load.spritesheet('explosion', 'assets/sprites/explosion.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    
    // Load audio
    this.load.audio('bgm', ['assets/audio/bgm.ogg', 'assets/audio/bgm.mp3']);

    // Display progress bar
    let progressBar = this.add.graphics();
    this.load.on('progress', (value) => {
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });
    
    // Remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
    });

  }

  create() {
    this.scene.start('menu'); 
  }

}