class StartScreen extends Phaser.Scene {
    constructor() {
        super("startScreen");
    }

 
    preload() {

        this.load.setPath("./assets/");
        this.load.atlasXML("gameParts", "round.png", "round.xml");
        this.load.image("health","tile_0044.png");
        this.load.image("pizza", "tile_0106.png");
        this.load.image("sushi", "tile_0104.png");
        this.load.image("doughnut", "tile_0014.png");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.audio("killsfx", "laserSmall_002.ogg");

    }

create() {
    let x = this.sys.game.config.width / 2;
    let y = this.sys.game.config.width / 2;
    

    this.add.bitmapText(x, y-100, "rocketSquare", "ZOOTASTroPhy", 80).setOrigin(0.5);
    

    this.add.bitmapText(x, 800, "rocketSquare", "Space to start", 40).setOrigin(0.5);
    
    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start("gameScene");
    });
}

    

    update(time, delta) {

    }
}