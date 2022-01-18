// Weather App Final

let w;

// past temperatures array for demo
let pastTemp;
let firstLoop = true;

let xDiv = 12;    // x axis divisions

let mode = 'shapes';

//TEXT
let font;
function preload() {
  font = loadFont('data/assets/WorkSans.ttf');
  fontItalic = loadFont('data/assets/WorkSans-Italic.ttf');
  font2 = loadFont('data/assets/Quicksand.ttf');
}

function setup() {
  createCanvas(360, 700);  // use the size of your phone
  textFont(font2);
  // get the current weather for MIT's latitude and longitude
  w = requestWeather(42.3596764, -71.0958358);  // MIT
  pastTemp = [];
}


function draw() {
  background(255);
  textAlign(CENTER, CENTER);
  
  fill('white');

  if (w.ready) {
    textSize(12);  
    // get the temperature to show on screen
    let readout_48 = w.getTemperature('hourly');
    // get the temperature, round it, and add the degree symbol
    //let readout = formatDegrees(w.getTemperature());
    
    //  run only once
    // pastTemp[i] = avgTemp + a * sin(2*PI / T * t)
    // avgTemp = current temp, a = range, T = 24, t = hour (0 - 47)
    let newTemp= [];
    if (firstLoop){
      console.log("IN");
      let avgTemp = readout_48[0];
      //console.log('HERE: ' + frameCount);
      // Create synthetic temp data for past 48 hours -
      for (let i = 0; i < 48; i++){
        let temp = avgTemp + 8 * sin(2 * PI / 24 * i);
        pastTemp.push(temp);
        console.log(temp);
      }
      // Put the data in reverse order in array with all temperatures
      for (let i = pastTemp.length - 1; i >= 0; i--){
        newTemp.push(pastTemp[i]);
      }
      newTemp = newTemp.concat(readout_48);
      //console.log(newTemp); // 97 indices
      firstLoop = false;
    }

    // show temperature in degrees
    //text(readout, width/2, height/2);
    console.log("New Temp", newTemp);
    
    newTemp = newTemp.slice(6,91);
    console.log("New Temp", newTemp);
    let minTemp = min(newTemp);
    let maxTemp = max(newTemp);
    console.log(readout_48[0]);
    let median = (min + max)/2;
    let lastCount = 0;
    
    let medTempBlue = int(map(median, minTemp, maxTemp, 255, 0));
    background(255);
    //background(255 - medTempBlue, 70 , medTempBlue, 200);
    //if (mode == 'shapes'){
      let blues = [];
      let alphas = [];
      // max blue --> min temp
      for (let i = 0; i < newTemp.length; i++){
        blues.push(int(map(newTemp[i], minTemp, maxTemp, 255, 0)));
        console.log(blues);
      }
      // Desaturate with alpha channel if cloudy
      let blue = [];
      //stroke(0);
      let rectSizeY = [width / 12, width / 12, width / 12, width / 6, height - 5 * width / 6, width / 6, width / 12, width / 12, width / 12];
      let rectSizeX = [width / 12, width / 12, width / 12, width / 6, width, width / 6, width / 12, width / 12, width / 12];
      let divX = [12, 12, 12, 6, 1, 6, 12, 12, 12];
      let y = [];
      let textSizes = [9, 9, 9, 12, 40, 12, 9, 9, 9];
      //Draw squares
      for (let j = 0; j <= 8 ; j++){
        if (j == 0) {
          y[j] = 0;
        } else {
          y[j] = y[j-1] + rectSizeY[j-1];
          console.log(y);
        }
        
        //Draw squares
        for (let i = 0; i < divX[j]; i++){
          blue[j] = [];
          if (j==0){
            
            blue[j][i] = blues[i];
            console.log("last count",lastCount);
            //stroke(0);
            fill(255-blue[j][i], 70, blue[j][i]);
            stroke(200);
            rect(rectSizeX[j] * i , y[j], rectSizeX[j], rectSizeY[j]);
            //text(formatDegrees(newTemp[lastCount])+'F', rectSizeX[j] * i - rectSizeX[j]/2 , y[j] + rectSizeY[j]/2  );
            stroke(255);
            textSize(textSizes[j]);
            text(formatDegrees(newTemp[lastCount])+'F', rectSizeX[j] * i + rectSizeX[j]/2 , y[j] + rectSizeY[j]/2  );
            noStroke();

            lastCount = lastCount+1;
          }else{
            //if(i==0 ){
            //  lastCount += divX[j-1];
            //}
            
            console.log("last count",lastCount);
            blue[j][i] = blues[lastCount];  
            stroke(200);
            fill(255-blue[j][i], 70, blue[j][i]);
            
            rect(rectSizeX[j] * i , y[j], rectSizeX[j], rectSizeY[j]);
            noFill();
            stroke(255);
            textSize(textSizes[j]);
            text(formatDegrees(newTemp[lastCount])+'F', rectSizeX[j] * i + rectSizeX[j]/2 , y[j] + rectSizeY[j]/2  );
            noStroke();
            
            console.log("BLUE", blue[j][i]);
            lastCount = lastCount+1;
            }
            
           //if (j==0){
           //   blue[i].push(blues[i]);
           // }else{
           //   lastCount += divX[j-1];
           //   blue[i].push(blues[lastCount + i]);

        }
      }
      console.log("Total blue", blue);
      
      
    //} else if (mode == 'information') {
      
      // Date on screen
      fill(255);
      //stroke(80);
      stroke(255);
      textFont(font2);
      textSize(30);
      // Date
      text(getDate(), width/2,  height/2 - 100);
      noStroke();
      textSize(16);
      // Time
      if (minute() <10) {
        text("at " + hour()+':0'+ minute() + ", the temperature is" , width/2, height/2 - 50);
      } else {
        text("at " + hour()+':'+ minute() + ", the temperature is" , width/2,  height/2 - 50);
      }
      textSize(40);
      stroke(255);
      text(formatDegrees(readout_48[0])+'F', width/2,  height/2);
      noStroke();
      textSize(16);
      text('and it feels like: ', width/2, height/2 + 60);
      textSize(24);
      text(formatDegrees(w.getApparentTemperature())+'F', width/2, height/2 + 100);

    //} 
    
    // stop drawing; the temperature won't change for a while
    noLoop();

  } else {
    textSize(30);
    text('Loading…', width/2, height/2);
  }
}

function getDate()
{
  let date = new Date();
  function formatDate(){
    return date.toDateString().slice(4);
  } 
  return formatDate(); 
}



function keyPressed() {
  if (keyCode === 32){
    if (mode == 'shapes') {
      mode = 'information';
    }else{
      mode = 'shapes';
    }
   console.log(mode);
  }
}
