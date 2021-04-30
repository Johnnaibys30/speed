const canvas = document.getElementById('speed');
const ctx = canvas.getContext('2d');
const road = new Image();
const carImage = new Image();
const trafficImage = new Image();
road.src ='./images/Toon-Road-Texture.png'
carImage.src='./images/Car-Sprite.png'
trafficImage.src='./images/pickup2.png'
const gameOver = document.querySelector("#GAME-OVER")
const restart = document.querySelector("#restart")
const gameWrapper = document.querySelector("#game-wrapper")
const infoWrapper = document.querySelector("#info-wrapper")

restart.addEventListener("click" ,startGame)
function startGame(){
    infoWrapper.classList.toggle ("hidden")
    gameWrapper.classList.toggle ("hidden")
    gameLoop = setInterval(draw, speed);

    console.log("hi")
}
window.addEventListener('keyup', e =>{
    console.log(e,e.key)
    if(e.key == 'd' || e.key == 'Right' || e.key == 'ArrowRight'){
        car.right = false
      }
      else if(e.key == 'a' || e.key == 'Left' || e.key == 'ArrowLeft'){
        car.left = false
      }
      else if(e.key == 'w' || e.key == 'Up' || e.key == 'ArrowUp'){
        car.up = false
      }
      else if(e.key == 's' || e.key == 'Down' || e.key == 'ArrowDown'){
        car.down = false
      }
    })
    window.addEventListener('keydown', e =>{
        if(e.key == 'd' || e.key == 'Right' || e.key == 'ArrowRight'){
            car.right = true
          }
          else if(e.key == 'a' || e.key == 'Left' || e.key == 'ArrowLeft'){
            car.left = true
          }
          else if(e.key == 'w' || e.key == 'Up' || e.key == 'ArrowUp'){
            car.up = true
          }
          else if(e.key == 's' || e.key == 'Down' || e.key == 'ArrowDown'){
            car.down = true
          }
        })
    


var CanvasXSize = 985;
var CanvasYSize = 600;
var speed = 40; // lower is faster
var scale = .5;
var y = -95; // vertical offset

class TrafficCar{
  constructor(x, y, width, height, image){
    this.x = x 
    this.y = y
    this.width = width
    this.height = height 
    this.image = image  
  
  }

  draw(ctx){
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    
  } 
}

const trafficCar1 = new TrafficCar(10,50,200,250) 
console.log (trafficCar1)
const car = {
    speed:10,
    x:20,
    y: (road.height * scale / 3.1),
    width:180,
    height:100,
}
//traffic
const traffic = {
  speed:5,
  x:5,
 // y:(road.height * scale/70),
  y:100,
  width:500,
  height:500,
} 
// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

//road.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';

const roadState = {
    left: { x: 0, y: 0 },
    right: { x: canvas.width, y: 0 }
}

// Main program
var dx = 30;
var imgW= canvas.width;
var imgH = canvas.height;
let gameLoop;

road.onload = function() {
  //  imgW = road.width * scale
// imgH = road.height * scale;
}

function draw() {
    // So we have a left image and a right image
    // We keep moving these two until the left is completely off the screen
    // Then we turn the right image into the left and create a new right image

    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
 
    // Check to see if right background image is past the point of view
    if (roadState.right.x < 0) {
        roadState.right.x = CanvasXSize;
        // traffic.y = math.random()*canvas.width;
       // console.log("weSwitch")
    }

    // Check to see if the left background image is completely off the screen
    if(roadState.left.x < -CanvasXSize){
        roadState.left.x = 0;
        traffic.y = Math.random()*canvas.height;
        // traffic.x = Math.random()*canvas.width;
        console.log("weSwitchLanes")
    }
    ctx.drawImage(road, roadState.right.x, roadState.right.y, imgW, imgH);
    ctx.drawImage(road, roadState.left.x, roadState.left.y, imgW, imgH);

    //draw car 
    ctx.drawImage(carImage,0,10,515,270,car.x,car.y,car.width,car.height);
    //draw traffic
    ctx.drawImage(trafficImage,0,5,295,trafficImage.height/4,traffic.x,traffic.y,traffic.width,trafficImage.height/4);
    
    // moving the images to the left (by changing the x value)
    roadState.right.x = roadState.right.x - dx
    roadState.left.x = roadState.left.x - dx
   // console.log(roadState.right.x)
   traffic.x = roadState.right.x ;
    if(car.up){
        car.y -=car.speed
    }
    if(car.down){
        car.y +=car.speed
    }

    if(car.left){
        car.x -=car.speed
    }
    if(car.right){
        car.x +=car.speed
    }
    if (car.x < traffic.x + traffic.width &&
      car.x + car.width > traffic.x &&
      car.y < traffic.y + traffic.height &&
      car.y + car.height > traffic.y){
      console.log("collision")
      clearInterval(gameLoop)
      gameWrapper.classList.toggle ("hidden")
      gameOver.classList.toggle ("hidden")

       // collision detected!
   }
}