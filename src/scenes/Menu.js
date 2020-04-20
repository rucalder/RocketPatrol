class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        //score display
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "26px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, "P1 Use arrows to move and (F) to Fire", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, "P2 Use mouse to move and click to Fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(centerX, centerY + 120, "Press (<-) for Easy and (->) for Hard", menuConfig).setOrigin(0.5);

        this.add.text(20, 20, "Rocket Patrol Menu");
        //this.scene.start("playScene");

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer1: 60000,
            gameTimer2: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer1: 45000,
            gameTimer2: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }

}