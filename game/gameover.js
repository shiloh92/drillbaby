// gameover.js

export default class GameoverScene extends Phaser.Scene {
  
  constructor() {
    super('gameover');
  }

  create() {

    // Game over text
    let text = this.add.text(400, 300, 'Game Over', { fontSize: 48 });
    text.setOrigin(0.5);

    // Play again button
    this.btn = this.add.sprite(400, 400, 'button').setInteractive();
    this.btn.on('pointerdown', () => { 
      this.scene.start('play'); // Restart game
    });

  }

}