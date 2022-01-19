//Brazil (19act sheet' view of film used as image in the visualization (from https://infodesign.mit.edu/film/sheet)
//sound downloaded from https://youtu.be/xfDqNGvnqCs and edited with PremierePro

let toggle = true;

//layers array 1: DREAMS, 2: FANTASIES, 3: EXPLOSIONS, 4: NIGHTMARES, 5: REALITY, 6: MIXED_REALITY
let layer_imgs = [];
let br1, br2, borders;
let brazil, title, frame, legend;
let pics;
let font_med, font_bold;

let intro, track;

let firstTime = true;
let firstTime2 = true;

function preload(){
  let i;
  for (i = 1; i <= 6; i++){
    layer_imgs[i] = loadImage('data/' + i + '.png');
  }
  br1 = loadImage('data/br1.png');
  br2 = loadImage('data/br2.png');
  //borders = loadImage('data/borders.png');
  brazil = loadImage('data/logo.png');
  title = loadImage('data/title.png');
  frame = loadImage('data/frame.png');
  //legend = loadImage('data/legend.png');
  pics = loadImage('data/pics2.png');
  title_small = loadImage('data/title_small.png');
  //Text
  font_med = loadFont('data/fonts/DancingScript-Medium.ttf');
  font_bold = loadFont('data/fonts/DancingScript-Bold.ttf');
  
  intro = loadSound('data/intro.mp3');
  track = loadSound('data/track.mp3');
  
 
}

function setup() {
  createCanvas(943, 786);
  textFont(font_med);
  textSize(15);
  
  intro.setVolume(0.03);
  track.setVolume(0.01);
  
}

function draw() {
  background(0);
  

  if (toggle){
    
    if (firstTime){
      intro.play();
      firstTime = false;
    }
    
    if (mouseX > width /2 -150 && mouseX < width/2 +150 && mouseY > height/2 - 100 && mouseY < height/2 + 100){
      tint(255, 200);
      image(pics, 0, -40);
      noTint();
      image(brazil, width/2 - 150, height/2 - 100);
    } else {
      //console.log("IN");
      brazil.resize(1500, 0);
      let a = true;
      if (a){
        noTint();
        image(brazil, width/2 - 150, height/2 - 100);
        a = false;
      }
      if (frameCount%15 == 0){
        tint(177, 19, 19, [150]);
        image(brazil, width/2 - 150, height/2 - 100);
      }
      if (frameCount%20 == 0){
        noTint();
        image(brazil, width/2 - 150, height/2 - 100);
      }
      if (frameCount%10 == 0){
        tint([90]);
        image(brazil, width/2 - 150, height/2 - 100);
      }
    }
    
    
  }else{
    
    if (firstTime2){
      track.loop();
      firstTime2 = false;
    }
    
    //console.log("OUT");
    image(frame, 0, 0);
    image(br1, 0, 0);
    //image(borders, 0, 0);
    //image(title, 0, 0);
    displayTitle();
    brazil.resize(width,0);
    image(brazil, 0, 0);
    
   displayLegend();
    
    
    // Legend checks
    if (mouseY > height - 22 && mouseY < height - 12){
      // DREAMS
      if (mouseX > width /2 - 117 && mouseX < width /2 - 117 + 40){
        console.log("DREAMS!");
        tint(255, 127);
        image(br2, 0, 0);
        image(layer_imgs[1], 0, 0);
        noTint();
        image(brazil, 0, 0);
      }else if (mouseX > width /2 - 5 && mouseX < width /2 - 5 + 40){
        // FANTASIES
        tint(255, 127);
        image(br2, 0, 0);
        image(layer_imgs[2], 0, 0);
        noTint();
        image(brazil, 0, 0);
      } else if (mouseX > width /2 + 117 && mouseX < width /2 + 117 + 40){
        // EXPLOSIONS
        tint(255, 127);
        image(br2, 0, 0);
        image(layer_imgs[3], 0, 0);
        noTint();
        image(brazil, 0, 0);
      }else if (mouseX > width /2 + 237 && mouseX < width /2 + 237 + 40){
        // NIGHTMARES
        tint(255, 127);
        image(br2, 0, 0);
        image(layer_imgs[4], 0, 0);
        noTint();
        image(brazil, 0, 0);
      }else if (mouseX > width /2 + 367 && mouseX < width /2 + 367 + 40){
        //REALITY
        tint(255, 127);
        image(br2, 0, 0);
        image(layer_imgs[5], 0, 0);
        noTint();
        image(brazil, 0, 0);
      } else{
      image(br1, 0, 0);
      image(brazil, 0, 0);
      }
    }
    
    // hover over screenshot
    
    //Realities and Dreams
    displayTitle();
  }
  
}

function blend_img(img1, img2){
  img1.blend(img2, 0, 0, width, height, 0, 0, width, height, LIGHTEST);
}

function mouseReleased(){
  toggle = !toggle;
}

function displayTitle(){
    textFont(font_bold);
    fill("#4a0d5c");
    textSize(22);
    text("Realities and Dreams", width - 206, 69);
    fill("#b11313");
    textSize(22);
    text("Realities and Dreams", width - 205, 70);
    fill(255, 220);
    textSize(22);
    text("Realities and Dreams", width - 204, 71);
}

function displayLegend(){
    //Button positions
    //DREAMS
    //dreams = createButton();
    //dreams.size(40, 10); 
    //dreams.position(width /2 - 117, height - 22);      
    //dreams.mousePressed(showDreams);
    textFont(font_med);
    textSize(17);
    fill("#a58c90");
    rect(width /2 - 117, height - 22, 40, 10);
    fill(255);
    text('dreams', width /2 - 117 + 45,  height - 13);
    //FANTASIES
    fill("#4a0d5c");
    rect(width /2 - 5, height - 22, 40, 10);
    fill(255);
    text('fantasies', width /2 + 40,  height - 13);
    // EXPLOSIONS 
    fill("#b11313");
    rect(width /2 + 117, height - 22, 40, 10);
    fill(255);
    text('explosions', width /2 + 117 + 45,  height - 13);
    //NIGHTMARES
    fill("#1b1947");
    rect(width /2 + 237, height - 22, 40, 10);
    fill(255);
    text('nightmares', width /2 + 237 + 45,  height - 13);
    //REALITY
    fill("#056ea5");
    rect(width /2 + 367, height - 22, 40, 10);
    fill(255);
    text('reality', width /2 + 367 + 45,  height - 13);
    noFill();
}
