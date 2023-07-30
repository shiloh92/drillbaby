// menu.js

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('menu');
  }

  create() {

    // Add title text
    this.add.text(400, 100, 'My Game', { fontSize: 48 });
    
    // Start game button
    this.startBtn = this.add.sprite(400, 300, 'button').setInteractive();
    this.startBtn.on('pointerdown', () => {
      this.scene.start('play'); 
    });

    // Options button
    this.optionsBtn = this.add.sprite(400, 400, 'button').setInteractive();
    this.optionsBtn.on('pointerdown', () => {
      // Show options menu
    });

  }

}