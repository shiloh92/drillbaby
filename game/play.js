// play.js

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super('play');
  }

  create() {
    // Initialize systems
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fuel = 100;

    this.ship = this.physics.add.sprite(400, 300, 'ship');
    this.ship.setCollideWorldBounds(true);

    this.asteroids = this.physics.add.group();
    this.generateAsteroids();

    // Collisions
    this.physics.add.collider(this.ship, this.asteroids, this.hitAsteroid, null, this);

  }

  update() {
    // Game loop logic
    
    this.moveShip();    
    this.wrapShip();

  }

  moveShip() {
    const speed = 5;  
    if(this.cursors.left.isDown) {
      this.ship.x -= speed;
    } else if(this.cursors.right.isDown) {
      this.ship.x += speed;
    }
  }

  wrapShip() {
    if(this.ship.x < 0) {
      this.ship.x = this.game.config.width;
    } else if(this.ship.x > this.game.config.width) {
      this.ship.x = 0;
    }
  }

// In PlayScene

generateAsteroids() {

  // Create asteroid group
  this.asteroids = this.physics.add.group({
    key: 'asteroid',
    repeat: 5,
    setScale: { x: 0.5, y: 0.5 },
    setXY: { x: 10, y: 10, stepX: 70 } 
  });

  this.asteroids.children.iterate(asteroid => {

    // Give each asteroid physics body
    asteroid.setBounce(1);
    asteroid.setCollideWorldBounds(true);
    asteroid.setVelocity(Phaser.Math.Between(-200, 200), 20);

  });

}


hitAsteroid(ship, asteroid) {
  
  // Reduce health
  this.health--;
  
  // Flash damage tint
  this.ship.setTint(0xff0000);
  setTimeout(() => ship.clearTint(), 100);
  
  // Destroy asteroid
  asteroid.destroy();

  // Game over on 0 health
  if(this.health === 0) {
    this.scene.start('gameover');  
  }
  
}

}