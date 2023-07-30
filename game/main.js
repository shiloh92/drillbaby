// main.js

// Import dependencies 
import 'phaser';
import config from './config.js';
import PreloadScene from './scenes/preload.js';
import MenuScene from './scenes/menu.js';
import PlayScene from './scenes/play.js';
import GameoverScene from './scenes/gameover.js';

// Game class
class Game extends Phaser.Game {

  constructor() {
    super(config);
    
    // Register scenes
    this.scene.add('preload', PreloadScene);
    this.scene.add('menu', MenuScene);  
    this.scene.add('play', PlayScene);
    this.scene.add('gameover', GameoverScene);
    
    // Start preload scene
    this.scene.start('preload');
  }

}

// Create new game instance
window.onload = function() {
  var game = new Game();
}