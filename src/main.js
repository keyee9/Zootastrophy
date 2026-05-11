
// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Game
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    //fps: { forceSetTimeOut: true, target: 30 },
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
        fps: { forceSetTimeOut: true, target: 60 },   // ensure consistent timing across machines

    width: 1000,
    height: 1000,
    scene: [StartScreen, GameScene, GameOver, WinScreen]


}

const game = new Phaser.Game(config);