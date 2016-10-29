"use strict";

var col = 101;
var row = 83;
var playerImg = 'images/char-boy.png';

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.width = 80;
    this.height = 40;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = 0;
        this.speed = Math.random() * 100 + 125;
    }

    // Increment enemies number if player is good
    if (player.points === 2 && allEnemies.length === 3) {
        allEnemies.push(new Enemy(-100, 60, 200));
    } else if (player.points === 5 && allEnemies.length === 4) {
        allEnemies.push(new Enemy(-250, 145, 100));
    } else if (player.points === 10 && allEnemies.length === 5) {
        allEnemies.push(new Enemy(-300, 225, 100));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = col * 2;
    this.y = row * 5 - 10;
    this.points = 0;

    this.width = 50;
    this.height = 40;

    this.sprite = playerImg;
};

// Move player
Player.prototype.update = function (move) {
    switch (move) {
        case "left":
            if (this.x > 0)
                this.x -= col;
            break;
        case "right":
            if (this.x < col * 4)
                this.x += col;
            break;
        case "up":
            if (this.y >= 0)
                this.y -= row;
            break;
        case "down":
            if (this.y < row * 5 - 10)
                this.y += row;
            break;
    }
};

// Update player position in canvas
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.y === -10) {
        this.y = row * 5 - 10;

        this.points++;
        alert('You Win! Points: ' + this.points);
    }
};


Player.prototype.handleInput = function (move) {
    this.update(move);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60, 200), new Enemy(0, 145, 100), new Enemy(0, 225, 150)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Check for collision between player and enemies
function checkCollisions() {
    allEnemies.forEach(function (enemy) {
        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.height + enemy.y > player.y) {

            if (player.points > 0) {
                player.points--;
            }
            alert('You Lose! Points: ' + player.points);

            // Back to start
            player.x = col * 2;
            player.y = row * 5 - 10;
        }
    });
}
