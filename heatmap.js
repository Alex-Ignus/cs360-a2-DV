this.loadedJSON;

let bar_spacing_px = 40;
let x_offset_px = 80;
let y_offset_px = 300;
let bar_width_px = 80;


function preload() {
    // Get the most recent earthquake in the database
    this.loadedJSON = loadJSON('video_games.json','json');
  }
  this.generePerConsol = { xbox:{action:0, adventure:0, rpg:0, racing:0, sports:0, strategy:0}, wii:{action:0, adventure:0, rpg:0, racing:0, sports:0, strategy:0}, ps3:{action:0, adventure:0, rpg:0, racing:0, sports:0, strategy:0}}
  this.genereTotal = {action:0, adventure:0, rpg:0, racing:0, sports:0, strategy:0};
  function setup() { 
    createCanvas(800, 530); 
    textSize(22); 
    readJson();  
  } 

  /**found  const scale func @ 
   * https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
   */
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }  

  function readJson(){
    var genere;
    var cons;
    for(var key in this.loadedJSON){
        cons = this.loadedJSON[key][0]["Release.Console"];
        genere = this.loadedJSON[key][0]["Metadata.Genres"];
        genere = genere.toLowerCase();
        if(this.generePerConsol.wii.hasOwnProperty(genere)){
          genereTotal[genere]++;
           if(cons == "wii"){
            this.generePerConsol.wii[genere]++;
           }else if (cons == "X360"){
            this.generePerConsol.xbox[genere]++;
           } else if (cons == "ps3"){
            this.generePerConsol.ps3[genere]++;
           }
        }
    }
    sortGenere();
  }

  function printLables(x, y){ 
    for(let i = 0; i < sortedGenere.length; i++){
      text(sortedGenere[i][0], x,y);
      x+=90;
    }
  }

  var sortedGenere = [];
  function sortGenere(){
    for (var keyG in genereTotal) {
        sortedGenere.push([keyG, genereTotal[keyG]]);
    }
    sortedGenere.sort(function(a, b) {
        return a[1] - b[1];
    });
  }
  function drawColorScale(){
    let x = -20;
    let x2 =65;
    let y = 250;

    for(let i = 0; i < 100; i+=10){
      fill(scale(i,0,100, 50, 255), 0, (255-scale(i,0,100, 0, 255)));
      x+=65;
      rect(x, y, 55, 40);
      fill('white')
     
      if(i<90){
        text(" <= " + (i+10),x2,y, 30);
      }else{ 
        text(" => 100 ",x2,y, 30);          
      } 
      x2+=65;
    }
    fill('black')
    text("Number Of Copies Sold", 270, 320)
  }
  function draw() {
  
      background(300);
      //Rectangles created by finding the top left value and drawing
      //down.
      let x = 90;
      let y = 100;
      noStroke();
      fill("black");
      text("Genre of Game's Sold", 270, 55)

      for(let keyC in this.generePerConsol){
        fill("black");
        text(keyC, 45, y+ 25);
        for(let i = 0; i < sortedGenere.length; i++){
          fill(scale(this.generePerConsol[keyC][sortedGenere[i][0]],0,100, 50, 255), 0, (255- scale(this.generePerConsol[keyC][sortedGenere[i][0]],0,100, 0, 255)));
          rect(x, y, bar_width_px, bar_spacing_px); // Draw rectangle
          x = x + 90;
        }
        
        y = y + 45;
        x = 90;
        if(keyC == "ps3"){
          textSize(16); 
          fill("black");
          printLables(100, 80)
        }
      }
      y = y + 25;
      drawColorScale();
  }
