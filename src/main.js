// MODIFIED ROCKET PATROL POINT BREAKDOWN:
//
// S-Rank Tier:         Implement simultaneous two-player mode (50)
// Intermediate Tier:   Simultaneous, asynchronous additive timing/scoring (25)
//                      Mouse control and mouse click for player 2 (25)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

function create(){
    game.physics.enable(p1Rocket, Phaser.Physics.ARCADE);
    game.physics.enable(p2Rocket, Phaser.Physics.ARCADE);
}

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer1: 60000,  
    gameTimer2: 60000  
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;