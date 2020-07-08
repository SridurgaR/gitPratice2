var trex, trex_running, trex_collided;
var ground, ground_image, invisible_ground;
var cloud, cloud_image;
var obstacle, obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5, obstacle_6;
var PLAY = 1,
  END = 0,
  gameState = PLAY;
var cloudGroup, obstacleGroup;

function preload() {
  ground_image = loadImage("ground2.png");
  trex_collided = loadAnimation("trex_collided.png");
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  cloud_image = loadImage("cloud.png");
  obstacle_1 = loadImage("obstacle1.png");
  obstacle_2 = loadImage("obstacle2.png");
  obstacle_3 = loadImage("obstacle3.png");
  obstacle_4 = loadImage("obstacle4.png");
  obstacle_5 = loadImage("obstacle5.png");
  obstacle_6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("run", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 1 / 2;
  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", ground_image);
  invisible_ground = createSprite(300, 190, 600, 10);
  invisible_ground.visible = false;
  ground.velocityX = -2;
  ground.x = ground.width / 2;
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(180);
  trex.collide(invisible_ground);

  if (gameState === PLAY) {


    if (keyDown("space") && trex.y >= 162) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.5;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    spawnClouds();

    spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
   else if (gameState === END) {
    trex.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    cloudGroup.setVelocityXEach (0);
    cloudGroup.setLifetimeEach (-1);
    obstacleGroup.setLifetimeEach (-1);
    trex.changeAnimation("collided",trex_collided);
  }


  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle_1);
        break;
      case 2:
        obstacle.addImage(obstacle_2);
        break;
      case 3:
        obstacle.addImage(obstacle_3);
        break;
      case 4:
        obstacle.addImage(obstacle_4);
        break;
      case 5:
        obstacle.addImage(obstacle_5);
        break;
      case 6:
        obstacle.addImage(obstacle_6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}
