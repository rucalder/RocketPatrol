// Rocket prefab
class Rocket1 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;          //track rocket's firing status

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    
    update(){
        //left and right movement
        if(!this.isFiring){
            if (keyLEFT.isDown && this.x >= 50){
                this.x -= 2;
            }
            else if (keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        //if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108){
            this.reset()
        }
    }

    //reset rocket to ground
    reset(){
        this.isFiring = false;
        this.y = 431;
    }
}