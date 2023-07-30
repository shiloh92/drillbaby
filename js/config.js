// Game configuration

export default {

  // Game details
  gameName: 'My Game',
  gameVersion: '0.1.0',
  
  // Rendering
  width: 800,
  height: 600,
  pixelArt: true,
  roundPixels: true,

  // Scenes
  scene: [
    'preload',
    'menu',
    'play',
    'gameover'
  ],

  // Assets
  assetFolder: 'assets/',

  // Input
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },

  // Physics
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  
  // Sound
  sound: {
    volume: 0.5,
    files: [
      {type: 'mp3', key: 'bgm', url: 'assets/music/bgm.mp3'}
    ]
  },

  // Scale manager
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }

}