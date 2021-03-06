class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00CF00).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket1(this, game.config.width/4 - 8, 431, "rocket").setScale(0.5, 0.5).setOrigin(0, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/2 + 8, 431, "rocket").setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width +96, 196, "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, "spaceship", 0, 10).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //mouse1 = Phaser.Input.Pointer.
        /*this.input.on("pointermove", ()=>{
            console.log(Phaser.Input.Pointer.x + " and the y " + Phaser.Input.Pointer.y);
            this.p1Rocket.x = Phaser.Input.Pointer.x;
            this.p1Rocket.y = 431;
        })*/



        //animation config
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate:30
        });

        //score
        this.p1Score = 0;
        this.p2Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let timeConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            //backgroundColor: "#F3B141",
            color: "#000000",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        

        this.endTime1 = 0;
        this.endTime2 = 0;

        this.timeInSec1 = game.settings.gameTimer1 / 1000;
        this.timeInSec2 = game.settings.gameTimer1 / 1000;
        
        this.endTime1 = Phaser.Time.Clock.now + game.settings.gameTimer1;
        this.endTime2 = Phaser.Time.Clock.now + game.settings.gameTimer2;

        this.timeLeft1 = this.endTime1 - Phaser.Time.Clock.now;
        this.timeLeft2 = this.endTime2 - Phaser.Time.Clock.now;

        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(480, 54, this.p2Score, scoreConfig);

        this.clock2;
        
        
        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock1 = this.time.delayedCall(game.settings.gameTimer1, () => {
            this.p1Rocket.setActive(false).setVisible(false);
            
            if(!this.p1Rocket.active && !this.p2Rocket.active){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
            
            //this.p1Rocket.destroy()
        }, null, this);
        this.clock2 = this.time.delayedCall(game.settings.gameTimer1, () => {
            this.p2Rocket.setActive(false).setVisible(false);
            if(!this.p1Rocket.active && !this.p2Rocket.active){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
        }, null, this);

        this.time1 = this.add.text(180, 54, this.timeInSec - this.clock1.getElapsedSeconds(), timeConfig);
        this.time2 = this.add.text(360, 54, this.timeInSec - this.clock1.getElapsedSeconds(), timeConfig);

        
        

        /*this.clock2 = this.time.delayedCall(game.settings.gameTimer2, () => {
            this.p2Rocket.destroy()
        }, null, this);

        /*if(this.timeLeft1 == 0 && this.timeLeft2 == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }*/
    
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        /*if(!this.p1Rocket.active && !this.p2Rocket.active){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }*/

        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            console.log("kaboom ship 03");
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
            this.clock1.delay += 500;
            this.timeInSec1 += 0.5;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            console.log("kaboom ship 02");
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
            this.clock1.delay += 1000;
            this.timeInSec1 += 1;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            console.log("kaboom ship 01");
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
            this.clock1.delay += 1500;
            this.timeInSec1 += 1.5;
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            console.log("kaboom ship 03");
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score;
            this.clock2.delay += 500;
            this.timeInSec2 += 0.5;
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            console.log("kaboom ship 02");
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score;
            this.clock2.delay += 1000;
            this.timeInSec2 += 1;
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            console.log("kaboom ship 01");
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score;
            this.clock2.delay += 1500;
            this.timeInSec2 += 1.5;
        }
        
        this.time1.text = this.timeInSec1 - this.clock1.getElapsedSeconds();
        this.time2.text = this.timeInSec2 - this.clock2.getElapsedSeconds();

        /*if(this.clock1.getElapsedSeconds() <= this.timeInSec){
            this.time1.text = this.timeInSec - this.clock1.getElapsedSeconds();
            this.time2.text = this.timeInSec - this.clock1.getElapsedSeconds();
        }
        if(this.clock3.getElapsedSeconds() != 0 && this.clock2.getElapsedSeconds() != 0){
            this.time1.text = this.timeInSec - this.clock2.getElapsedSeconds();
            this.time2.text = this.timeInSec - this.clock3.getElapsedSeconds();
        }*/

    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y +ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }
            else{
                return false;
            }
    }

    shipExplode(ship){
        ship.alpha = 0;

        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })

        // score increment and repaint
         

        this.sound.play('sfx_explosion')
    }

}