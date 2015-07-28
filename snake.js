
//var raphael = require('raphael');

////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////////////////////////////////////////
var numberOfSegments = 10;
var Snake = Array(numberOfSegments);
var istart = 10;
var jstart = 10;

Snake[0] = new Segment(numberOfSegments,istart,jstart);
for(var i = 1; i < numberOfSegments; i++){
	Snake[i] = new Segment(numberOfSegments-i,istart-i,jstart);	
}
//var inow = 0;
//var jnow = 0;
var directionx = 1;
var directiony = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Object with methods for Segment.
////////////////////////////////////////////////////////////////////////////////////////////////////
function Segment(state,x,y) {

	if(!state){
	   	this.state = 0;	 // Sets state of the segment, is it part of the snake?.
	}
   else{
    	this.state = state;
	}

	if(!x){
    	this.x = 0;	 // Sets x value.
   }
   else{
    	this.x = x;
	}
	
	if(!y){
    	this.y = 0;	 // Sets y value.
   }
   else{
    	this.y = y;
	}

// Makes the snake longer.    	
//Segment.prototype.makeLonger = function(){	
//	if(this.state>0){this.state--;}
//}

// Makes the person sick.
//Segment.prototype.currentPlace = function(){
//	this.state = 5;
//}

}  
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Create RaphaelJS background.
////////////////////////////////////////////////////////////////////////////////////////////////////
function init(){
	
	var paper = Raphael(document.getElementById('canvas_container'), 600, 600); //RaphaelJS container.

	start();
}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Game loop.
////////////////////////////////////////////////////////////////////////////////////////////////////
function start(){
		
	//draw_background();
	draw_snake();
	update();
	document.onkeydown = listen;
	setTimeout("paper.clear();start()",75)
	
}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Background drawing function.
////////////////////////////////////////////////////////////////////////////////////////////////////
function draw_background(){
	var rec;

		for(var i = 0; i < 50; i++){
			for(var j = 0; j < 50; j++){
				rec = paper.rect(12*i,12*j,12,12);
				rec.attr({fill:"#ccc","stroke-width":0.25});
			}
		}
}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Snake drawing function.
////////////////////////////////////////////////////////////////////////////////////////////////////
function draw_snake(){
	var rec;

		rec = paper.rect(12*Snake[0].x,12*Snake[0].y,12,12);
		rec.attr({fill:"#f00","stroke-width":0});

		for(var i = 0; i < numberOfSegments; i++){
			rec = paper.rect(12*Snake[i].x,12*Snake[i].y,12,12);
			if(i == 0){
				rec.attr({fill:"#00f","stroke-width":0});
			}
			else{
				rec.attr({fill:"#f00","stroke-width":0});
			}
		}
}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Update segment position.
////////////////////////////////////////////////////////////////////////////////////////////////////
function update(){
	
var xholder = Snake[0].x;
var yholder = Snake[0].y;
var xholder2;
var yholder2;		
		
		if(Snake[0].x < 49 && directionx == 1){		
			Snake[0].x += directionx;
		}
		if(directionx == -1 && Snake[0].x > 0){
			Snake[0].x += directionx;
		}
		if(Snake[0].y < 49 && directiony == 1){		
			Snake[0].y += directiony;
		}
		if(directiony == -1 && Snake[0].y > 0){
			Snake[0].y += directiony;
		}


	if(directionx != 0 || directiony != 0){
		for(var i = 1; i < numberOfSegments; i++){
			xholder2 = Snake[i].x;
			yholder2 = Snake[i].y;
			Snake[i].x = xholder;
			Snake[i].y = yholder;		
			xholder = xholder2;
			yholder = yholder2;	
		}
	}

	if(Snake[0].x == 49 || Snake[0].x == 0){
		directionx = 0;
	}
	if(Snake[0].y == 49 || Snake[0].y == 0){
		directiony = 0;
	}

}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// Array drawing function.
////////////////////////////////////////////////////////////////////////////////////////////////////
function listen(e){
	
	if(!e){
   		//for IE
      e = window.event;
   }
	if(e.keyCode==37 && directionx !=1){
      //keyCode 37 is left arrow
   		directionx = -1;
   		directiony = 0;
   }
   if(e.keyCode==39 && directionx !=-1){
   		//keyCode 39 is right arrow
   		directionx = 1;
   		directiony = 0;
   }
   if(e.keyCode==38 && directiony !=1){
      //keyCode 38 is down arrow
   		directionx = 0;
   		directiony = -1;
   }
   if(e.keyCode==40 && directiony !=-1){
   		//keyCode 40 is up arrow
   		directionx = 0;
   		directiony = 1;
   }
//   for(i = 0; i < numberOfPeople; i++){
//			for(j = 0; j < numberOfPeople; j++){			
//			MyArray[i][j].makeSusceptible();	
//			}	
//		} 	
}
////////////////////////////////////////////////////////////////////////////////////////////////////
 
