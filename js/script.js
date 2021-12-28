var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;
var points = 0;
var fuel = 15;
var time = 120;

var spaceshipImage = 'files/spaceship.png';
var spaceshipX = 0;
var spaceshipY = width / 2 + 30;
var spaceshipWidth = 40;
var spaceshipHeight = 90;
var MoveRight = 12;
var MoveLeft = -12;
var MoveTop = -12;
var MoveDown = 12;

var bulletImage = 'files/bullet.png';
var bulletX = 0;
var bulletY = height - 100;
var bulletWidth = 10;
var bulletHeight = 10;
var fireing = 0;

var enemyImage = 'files/enemy.png';
var enemyX = Math.floor(Math.random() * 600);
var enemyY = Math.floor(Math.random() * 200);
var enemyWidth = 90;
var enemyHeight = 60;

var friendImage = 'files/friend.png';
var friendX = width;
var friendY = Math.floor(Math.random() * 200);
var friendWidth = 90;
var friendHeight = 40;

var fuelImage = 'files/fuel.png';
var fuelX = 0;
var fuelY = Math.floor(Math.random() * 200);
var fuelWidth = 80;
var fuelHeight = 90; 


// Function to move the rocket

document.addEventListener('keydown', keyDownListner, false);

// Function to deduct fuel

var interval = setInterval(function(){
    fuel -= 1;
    document.getElementById('fuel').innerHTML = fuel;

    if(fuel <= 0){
        alert('Sorry Your Fuel is Over');
        document.location.reload();
        clearInterval(interval);
    }
}, 1000);

// Function to deduct time

var interval = setInterval(function(){
    time -= 1;
    document.getElementById('time').innerHTML = time;

    if(time <= 0){
        alert('Sorry Time up');
        document.location.reload();
        clearInterval(interval);
    }
}, 1000);

function keyDownListner(e){
    if(e.key == 'right' || e.key == 'ArrowRight'){
        if(spaceshipX < width - spaceshipWidth){
            spaceshipX += MoveRight;
            bulletX += MoveRight;
        }
    }
    if(e.key == 'left' || e.key == 'ArrowLeft'){
        if(spaceshipX > 0){
            spaceshipX += MoveLeft;
            bulletX += MoveLeft;
        }
    }
    if(e.key == 'up' || e.key == 'ArrowUp'){
        if(spaceshipY > 8){
            spaceshipY += MoveTop;
            bulletY += MoveTop;   
        }
    }
    if(e.key == 'down' || e.key == 'ArrowDown'){
        if(spaceshipY < 380){
            spaceshipY += MoveDown;
            bulletY += MoveDown;
        }
    }
    if(e.keyCode == 32){
        fireing = setInterval(bullet_fire, 10);
    }
}

// Making Rocket Movement

function spaceship(){
    var img = new Image();
    img.src = spaceshipImage;
    ctx.drawImage( img, spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight);
}

// Function for Bullet

function bullet(){
    var img = new Image();
    img.src = bulletImage;
    ctx.drawImage( img, bulletX  + 18, bulletY, bulletWidth, bulletHeight);
}

function bullet_fire(){
    bulletY += -10;
    if(bulletY <= 0){
        bulletY = spaceshipY;
        stop_fireing();
    }
}

function stop_fireing(){
    clearInterval(fireing);
}

// Getting Enemy Spaceships

function enemy_spaceships(){
    var img = new Image();
    img.src = enemyImage;
    ctx.drawImage( img, enemyX, enemyY, enemyWidth, enemyHeight);
}


// Makeing Fuel 

function fuel_maker(){
    var img = new Image();
    img.src = fuelImage;
    ctx.drawImage( img, fuelX, fuelY, fuelWidth, fuelHeight);
}

function move_fuel(){
    fuelX += 10;
    if(fuelX > width){
        fuelX = 0;
    }
};


// Engine Function to run the game

function engine(){
    ctx.clearRect( 0, 0, width, height);
    bullet();
    spaceship();
    enemy_spaceships();
    fuel_maker();
    move_fuel();
    console.log(bulletX, enemyX);
    
    if(bulletX > enemyX && bulletX < enemyX + enemyWidth && bulletY > bulletY && bulletY < bulletY + height || bulletX + bulletWidth > enemyX && bulletX + bulletWidth < enemyX + enemyWidth && bulletY + bulletWidth > enemyY && bulletY + bulletWidth < enemyY + enemyWidth ){
        enemyX = Math.floor(Math.random() * 600);
        enemyY = Math.floor(Math.random() * 200);
        bulletY = spaceshipY;
        stop_fireing();
        points += 10;
        document.getElementById('points').innerHTML = points;
    }
    if(bulletX > fuelX && bulletX < fuelX + fuelWidth && bulletY > fuelY && bulletY < fuelY + fuelHeight || bulletX + bulletWidth > fuelX && bulletX + bulletWidth < fuelX + fuelWidth && bulletY + bulletWidth > fuelY && bulletY + bulletWidth < fuelY + fuelWidth ){
        bulletY = spaceshipY;
        stop_fireing();
        fuel += 15;
    }

}

setInterval(engine, 30);