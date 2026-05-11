class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
        this.highscores=[];

    }

init(data) {
    this.finalScore = data.score || 0;

    // 1. Get the current high score from storage (or 0 if it doesn't exist)
    let savedHighScore = localStorage.getItem("highest") || 0;

    // 2. Compare and update
    if (this.finalScore > savedHighScore) {
        localStorage.setItem("highest", this.finalScore);
        this.highScore = this.finalScore;
        this.newRecord = true; // Flag to show a "New Record!" message
    } else {
        this.highScore = savedHighScore;
        this.newRecord = false;
    }
}
    
    preload() {



    }

create() {
    let x = this.sys.game.config.width / 2;
    
    this.add.bitmapText(x, 200, "rocketSquare", "You lose...", 100).setOrigin(0.5);
    
    // Show Final Score
    this.add.bitmapText(x, 300, "rocketSquare", "Score: " + this.finalScore, 50).setOrigin(0.5);
    
    // Show High Score
    this.add.bitmapText(x, 450, "rocketSquare", "Best: " + this.highScore, 40).setOrigin(0.5);

    if (this.newRecord) {
        let msg = this.add.bitmapText(x, 600, "rocketSquare", "New record!", 32).setOrigin(0.5);
    }

    this.add.bitmapText(x, 800, "rocketSquare", "Space to play again", 60).setOrigin(0.5);
    
    this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start("gameScene");
    });
}

    

    update(time, delta) {

    }
}