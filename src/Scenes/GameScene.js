class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.my = {sprite: {}, text:{}}; 
    }
    preload() {
    }

    create() {
        let my = this.my; 

        this.myScore=0;
        this.my.sprite.bullet = [];
        this.maxBullets = 15;


        this.my.sprite.enemies = [];  
        this.spawnCount=0; 
        this.numEnemies = 5; 
        this.maxEnemies = 20; 

        this.my.sprite.enemyBullets = [];

        this.hearts=[];
        this.hp=3;
        this.invincible=false;


        my.sprite.body = this.add.sprite(500, 950, "gameParts","pig.png");
        my.sprite.body.scale=0.25;

        this.oKey=this.input.keyboard.addKey('O');
        this.pKey=this.input.keyboard.addKey('P');
        this.aKey= this.input.keyboard.addKey('A');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dKey= this.input.keyboard.addKey('D');
        my.text.score = this.add.bitmapText(750, 0, "rocketSquare", "Score " + this.myScore);

    // Create HP Bar    
    for(let i=0; i<this.hp; i++){
        let healthbar=this.add.sprite(50+(i*35),980, "health");
        healthbar.setScale(2);
        this.hearts.push(healthbar);
        }
    }

    update(time, delta) {
        let my = this.my;    // create an alias to this.my for readability
        const speed = 500;
        let dt = delta/1000;
// Player Movement & Bullet
	if (this.aKey.isDown) {
		my.sprite.body.x -= speed * dt;  
		if (my.sprite.body.x <= 0) my.sprite.body.x = 0;
        
    }   
	if (this.dKey.isDown) {
		my.sprite.body.x += speed * dt;  
		if (my.sprite.body.x >=1000) my.sprite.body.x =1000;
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)){
        if (my.sprite.bullet.length<this.maxBullets){
            let a=this.add.sprite(
                my.sprite.body.x,
                my.sprite.body.y, 
                "doughnut"
            )
            a.scale=2;
            my.sprite.bullet.push(a);   
            }
        }
    my.sprite.bullet= my.sprite.bullet.filter((bullet) => {
    if (bullet.y > -(bullet.displayHeight/2)){
            return true;    
    } else {
        bullet.destroy();
        return false;
    }
});

// Bullet Collision
for (let bullet of my.sprite.bullet) {
    bullet.y -= 500 * dt;

    // Check this bullet against every enemy in the array
    for (let enemy of my.sprite.enemies) {
        if (enemy.active && bullet.active && this.collides(enemy, bullet)) {
            bullet.destroy(); 
            enemy.destroy();
            this.myScore += 25;
            this.updateScore();
        }
    }
    
}
// Enemy Movement
for (let enemy of my.sprite.enemies) {
    if (!enemy.active) continue; // skips if dead

    enemy.x += enemy.speed * dt;
    if (enemy.x >= 1000 || enemy.x<=0) {
        enemy.speed *= -1;                  // reverses direction
    }


if (Math.random() < 0.01) {
            let b = this.add.sprite(enemy.x, enemy.y + 50, "pizza");
            b.setScale(2);
            my.sprite.enemyBullets.push(b);
}

}
    for (let bullet of my.sprite.enemyBullets){
        bullet.y+=700*dt;
        if (bullet.active && this.collides(my.sprite.body, bullet)){
            bullet.destroy();
                if (!this.invincible){
                    this.hp-=1; // so only subtract one life
                }
                this.invincible=true;
                this.invincible = false;
 
            let heart = this.hearts.pop();
            if (heart) heart.destroy();
            }
        }
    my.sprite.enemyBullets= my.sprite.enemyBullets.filter((bullet) => {
    if (bullet.y <1000){
            return true ;    
    } else {
        bullet.destroy();
        return false;
    }
});
            
my.sprite.enemies = my.sprite.enemies.filter(enemy => enemy.active); //removes deadsprites
if (this.my.sprite.enemies.length < this.numEnemies && this.spawnCount < this.maxEnemies) { //Fixed number and total number of enemies
    this.spawnEnemy();
}

    if (this.hp<=0){
this.scene.start("gameOver", { score: this.myScore });    }

if (my.sprite.enemies.length === 0) {
    this.scene.start("winScreen", { score: this.myScore}); }

    if (this.oKey.isDown){
this.scene.start("winScreen", { score: this.myScore });    }
    if (this.pKey.isDown){
this.scene.start("gameOver", { score: this.myScore });    }


}
    
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    }
   
    spawnEnemy() {

    
        let x = Math.random() * this.sys.game.config.width;
        let y = Math.random() * 100+50; 
    
        let enemy = this.add.sprite(x, y, "gameParts", "hippo.png");
        enemy.setScale(0.25);
        enemy.speed=500;
        this.my.sprite.enemies.push(enemy);
        this.spawnCount++;
    }




}




