class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.bodyX= 300;
        this.bodyY= 350;



        //Create constants for the monster location

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("gameParts", "spritesheet_retina.png", "spritesheet_retina.xml");

    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "gameParts","character_roundRed.png");
        my.sprite.bullet = this.add.sprite(this.bodyX, this.bodyY, "gameParts","character_handPurple.png");
        my.sprite.bullet.visible = false;  

        this.aKey= this.input.keyboard.addKey('A');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.bulletfired=false;
        this.dKey= this.input.keyboard.addKey('D');
        this.launching=false;
        
        
    }

    update(time, delta) {
        let my = this.my;    // create an alias to this.my for readability
        const speed = 300;
	if (this.aKey.isDown) {
		my.sprite.body.x -= speed * (delta/1000);  
		if (my.sprite.body.x <= 0) my.sprite.body.x = 0;
        
    }   
	if (this.dKey.isDown) {
		my.sprite.body.x += speed * (delta/1000);  
        
		if (my.sprite.body.x >=800) my.sprite.body.x = 800;
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)){
        if (!this.launching){
            my.sprite.bullet.setPosition(my.sprite.body.x,my.sprite.body.y);
            my.sprite.bullet.visible=true;
            this.launching=true;
            this.bulletfired=true;
        }
    }   

    if (this.bulletfired){
        
        my.sprite.bullet.y -= speed * (delta/1000);  
		if (my.sprite.bullet.y <=0) {
            my.sprite.bullet.y =0;
            this.bulletfired=false;
            this.launching=false;

        }

    }
}

}   
