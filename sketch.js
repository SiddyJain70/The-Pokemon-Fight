var PLAY = 1;
var END = 0;
var gameState = PLAY;

var RULES =2;
var gameState = RULES;

var pokemon,pokemonDancing,ground, danger, fireball, pokemonJump, coins,faintedPokemon,YouWon;

var dangerAnimation, fireballAnimation, pokemonAnimation1, pokemondancingAnimation,faintedAnimation,pokemonDancingAnimation;

var groundImg, jumpImg, sunImg, coinsImg;

var restart, gameover, reastartImg, gameoverImg, fireballImg,YouWonImg;

var continue1,continue1Img,rulesImg,rules;

var dangerGroup, fireballGroup, coinsGroup;

var coinSound,jumpSound,gameOverSound,winSound,runningSound,continueSound,fireballSound;

var Points=0;

function preload() {

  pokemonAnimation1 = loadAnimation("pokemon 1.png", "pokemon 2.png", "pokemon 3.png", "pokemon 4.png");
  
  pokemonDancingAnimation = loadAnimation("pokemon dancing1.png","pokemon dancing2.png","pokemon dancing3.png","pokemon dancing4.png","pokemon dancing5.png","pokemon dancing6.png","pokemon dancing7.png","pokemon dancing7.png","pokemon dancing8.png","pokemon dancing9.png","pokemon dancing10.png","pokemon dancing11.png","pokemon dancing12.png","pokemon dancing13.png","pokemon dancing14.png","pokemon dancing15.png","pokemon dancing16.png","pokemon dancing17.png","pokemon dancing18.png")

  dangerAnimation = loadAnimation("charizard1.png", "charizard2.png", "charizard3.png", "charizard4.png", "charizard5.png", "charizard6.png", "charizard7.png", "charizard8.png", "charizard9.png", "charizard10.png", "charizard11.png", "charizard12.png", "charizard13.png", "charizard14.png");


  groundImg = loadImage("ground1.png");
  sunImg = loadImage("sun.png");

  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("game over.png");

  jumpImg = loadAnimation("pokemon jump.png");
  fireballImg = loadImage("fireball.png");
  
  coinsImg = loadImage("coin.png");
  YouWonImg = loadImage("you won.png");
  
  rulesImg = loadImage("Presentation1.png");
  continue1Img = loadImage("continue.jpg");
  
  faintedAnimation = loadImage("fainted pikachu.png");
  
  coinSound = loadSound("coin.mp3");
  jumpSound = loadSound("player jumping.wav");
  gameOverSound = loadSound("game over sound.wav");
  winSound = loadSound("win.wav");
  
  runningSound = loadSound("running.mp4");
  fireballSound = loadSound("Fireball+2.mp3");
  continueSound =loadSound("on click continue.wav")
}

function setup() {
  createCanvas(800, 600);
  
  
  ground = createSprite(300, 300, 0, 0);
  ground.addImage(groundImg);
  ground.scale = 3;
  //ground.velocityX = -5;
 
 sun = createSprite(50,50);
  sun.addImage(sunImg);
 sun.scale = 0.1;

  pokemon = createSprite(50, 450, 0, 0);
  pokemon.addAnimation("pokemonRunning", pokemonAnimation1);
  pokemon.scale = 0.4;
  
  pokemonDancing = createSprite(400,400);
  pokemonDancing.addAnimation("dancing",pokemonDancingAnimation);
  pokemonDancing.scale=0.8;
  
  faintedPokemon = createSprite(100,550);
  faintedPokemon.addAnimation("fainted",faintedAnimation);
  faintedPokemon.scale=0.3;
  //faintedPokemon.visible=false;
  
  YouWon = createSprite(400,150);
  YouWon.addImage(YouWonImg);
  YouWon.scale=0.5;

  gameover = createSprite(400, 150);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;

  restart = createSprite(400,300,0,0);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  rules = createSprite(390,300,0,0);
  rules.addImage(rulesImg);
  rules.scale=0.6;
  
  
  continue1 = createSprite(650,490,0,0);
  continue1.addImage(continue1Img);
  continue1.scale=0.4;
  
    gameover.visible = false;
    restart.visible = false;
    YouWon.visible = false;
  
    pokemonDancing.visible=false;
    rules.visible=false;
   continue1.visible=false;
  
  dangerGroup = new Group();
  fireballGroup = new Group();
  coinsGroup = new Group();
  
  pokemon.setCollider('rectangle', 0, 0, pokemon.width - 10,           pokemon.height - 10)
   //pokemon.debug = true;


}

function draw() {
  if(gameState === RULES){
    
    rules.visible=true;
    continue1.visible=true;
    ground.visible=false;
    pokemon.visible=false
    dangerGroup.visible=false;
    fireballGroup.visible=false;
    coinsGroup.visible=false;
    faintedPokemon.visible=false;
    restart.visible=false;
    gameover.visible=false;
    Points.visible=false;
    sun.visible=false;
   
    
    //text.changeColor("white")
   
    
    if (mousePressedOver(continue1)) {
        gameState = PLAY;
      continueSound.play();
      }
   
  }
  if (gameState === PLAY) {
     background(0);
    
     rules.visible=false;
    continue1.visible=false;
    ground.visible=true;
    pokemon.visible=true;
    dangerGroup.visible=true;
    fireballGroup.visible=true;
    coinsGroup.visible=true;
    faintedPokemon.visible=true;
    Points.visible=true;
    sun.visible=true;
    
    ground.velocityX =-10;
    
    faintedPokemon.visible=false;
    edges = createEdgeSprites();
    pokemon.collide(edges);
    
    if (ground.x < 0) {
    ground.x = ground.width / 2;
    }

    if (keyDown("space") && pokemon.y >= 490) {
      
      pokemon.velocityY = -12;
      jumpSound.play();
    }
    
    //Adding Gravity To The Pokemon
    if (pokemon.y < 700) {
      pokemon.velocityY = pokemon.velocityY + 0.8;
    }

    if (keyDown("shift")) {
      ground.addSpeed(-20, 0);
      
      //runningSound.play();
      
      dangerGroup.destroyEach();
      fireballGroup.destroyEach();
      coinsGroup.destroyEach();
    }
    else(ground.velocityX= -10)
    
      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }
    
     
    
    if (ground.velocityX === -5) {
      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }
    }
      danger();
      coins();
      if (fireballGroup.isTouching(pokemon)) {
        
       gameState = END;
        
         gameOverSound.play();
        
         dangerGroup.destroyEach();
       fireballGroup.destroyEach();
        
         faintedPokemon.visible=true;
        pokemon.visible=false;
        
        rules.visible=false;
       continue1.visible=false;
      }
    else(gameOverSound.stop());
    if(pokemon.isTouching(coinsGroup)){
      
      Points=Points+1;
      coinSound.play();
      
    }
    if(Points===30){
      YouWon.visible=true;
      restart.visible=true;
      pokemonDancing.visible=true;
      pokemon.visible=false;
      
      //winSound.play();
      
      
      fireballSound.stop();
      
       ground.velocityX = 0;
      pokemon.velocityY = 0;

      dangerGroup.destroyEach();
      fireballGroup.destroyEach();
      coinsGroup.destroyEach();
      
      if (keyDown("shift")) {
        ground.velocityY = 0;
      }
      if (mousePressedOver(restart) || keyDown("r")) {
        reset();
      }
   
    }
  }

    if (gameState === END) {
      
      gameover.visible = true;
      restart.visible = true;
      
     //gameOverSound.play();
      
      ground.velocityX = 0;
      pokemon.velocityY = 0;

      dangerGroup.destroyEach();
      fireballGroup.destroyEach();
      coinsGroup.destroyEach();
      
      if (keyDown("shift")) {
        ground.velocityY = 0;
      }
      if (mousePressedOver(restart) || keyDown("r")) {
        reset();
      }
      
    }
     drawSprites();
  textSize(30);
  fill("black");
 // stroke("black");
  text("Points: "+ Points,300,50);
  }

  function reset() {
    gameState = PLAY;
    ground.velocityX = -5;
    
    gameover.visible = false;
    restart.visible = false;
    YouWon.visible = false;
    pokemon.visible=true;
    pokemonDancing.visible=false;
    
    Points=0;
}

function danger() {
  if (frameCount % 250 === 0) {
    var danger = createSprite(600, 100, 0, 0);
    danger.x = Math.round(random(600, 500));
    danger.addAnimation("charizard", dangerAnimation);
    danger.scale = 0.5;

    var fireball = createSprite(400, 100, 0, 0);
    fireball.addImage(fireballImg);
    fireball.addSpeed(-5, -50)
    fireball.scale = 0.1
    
   fireballSound.play();

    danger.lifetime = 100;
    fireball.lifetime = 100;

    dangerGroup.add(danger);
    fireballGroup.add(fireball);
    //fireball.debug=true;
  }
 
}

function coins(){
   if (frameCount % 20 === 0) {
    var coins = createSprite(200, 550, 0, 0);
    coins.x = Math.round(random(800,800));
    coins.addImage(coinsImg);
    coins.scale = 0.25;
    coins.velocityX= -5
     
     coins.lifetime=120;
     
     coinsGroup.add(coins);
   }
}