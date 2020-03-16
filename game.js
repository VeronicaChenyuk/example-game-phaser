const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
})
let platforms
let player
let diamonds
let score = 0;
let scoreText;
let bombs;
let gameOver;
let wins;

function preload() {
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png')
  game.load.image('diamond', 'assets/кофе.png')
  game.load.spritesheet('woof', 'assets/woof.png',45,45)
  game.load.image('bomb', 'assets/bomb.png');
  game.load.image('win', 'assets/win.png')

}
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.add.sprite(0, 0, 'sky')

  platforms = game.add.group();
  platforms.enableBody = true;

  let ground = platforms.create(0, 540, 'ground')
  ground.scale.setTo(2, 3)

  ground.body.immovable = true
  let ledge = platforms.create(400, 450, 'ground')
  ledge.body.immovable = true
  

  ledge = platforms.create(-75, 350, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-200, 280, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-300, 200, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(750, 370, 'ground')
  ledge.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, 'woof')
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 800;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1], 10, true)
  player.animations.add('left', [2, 3], 10, true)

  diamonds = game.add.group()
  diamonds.enableBody = true

  for (let i = 0; i < 12; i++) {
    let diamond = diamonds.create(i * 70, 0, 'diamond')
    diamond.body.gravity.y = 1000
    diamond.body.bounce.y = 0.3 + Math.random() * 0.2
  }
  bombs = game.add.group()
  bombs.enableBody = true

  wins = game.add.group()
  wins.enableBody = true


  scoreText = this.add.text(16, 16, 'score: 0', { fontsize: '250px', fill: '#FFFFFF', })
  cursors = this.input.keyboard.createCursorKeys()
}
function update() {
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(diamonds, platforms)
  game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)
  game.physics.arcade.collide(bombs, platforms)
  game.physics.arcade.overlap(player, bombs, hitBomb, null, this)



  player.body.velocity.x = 0

  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    player.animations.stop()
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -400
  }
  if (score === 120){
    let winner = wins.create(180, 100, 'win')
    winner.body.immovable = true
      
  }
}

function hitBomb(player, bomb) {
  game.physics.pause();
  
  player.setTint(0xff0000);
  
  player.animations.play('right');
  
  gameOver = true;
}

function collectDiamond(player, diamond) {
  diamond.kill()

  score += 10
  scoreText.text = 'Score: ' + score

}
