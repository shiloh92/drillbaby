// Utility functions

export function formatTime(seconds) {
  // Converts seconds to MM:SS string
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function randRange(min, max) {
  // Generate random number between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createAnimations(scene, spritesheet, anims) {
  // Helper to create animations from a spritesheet
  const anims = scene.anims;
  
  for (const anim of anims) {
    anims.create({
      key: anim.key,
      frames: anims.generateFrameNumbers(spritesheet, {
        start: anim.start, 
        end: anim.end
      }),
      frameRate: anim.frameRate,
      repeat: anim.repeat
    });
  }
}