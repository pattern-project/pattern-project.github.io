function patternLogo(svg,x,y){

	console.log("Adding logo");
	console.log(svg);
    let svgContainer = svg.append("g")
    	.attr("transform", "translate(" + (x-100) + "," + (y-100) + ")");

    console.log(svgContainer);

    let circle = svgContainer.append("circle")
        .attr("cx", 100)
        .attr("cy", 100)
        .attr("r", 100)
        .style("fill",'#0b2bfb');

    let line = svgContainer.append("line")
		.attr("x1", 36)
		.attr("y1", 100)
		.attr("x2", 164)
		.attr("y2", 100)
		.attr("stroke-width", 2)
		.attr("stroke", "#ffffff");

	let patternText = svgContainer
		.append("text");

	patternText
		.attr("x", 36)
		.attr("y", 90)
		.text("PATTERN")
		.attr("font-family", "Roboto")
		.attr("font-size", "30px")
		.attr("fill", "#ffffff");

	let projectText = svgContainer
		.append("text");


	projectText
		.attr("x", 36)
		.attr("y", 132)
		.text("PROJECT")
		.attr("font-family", "Roboto")
		.attr("font-size", "30px")
		.attr("fill", "#ffffff");				
}

function movingZigZag(svg,startX,startY,length,direction,travel,width,height){

	let data = genData(startX,startY,length,direction);

	let zigZagFunction = d3.svg.line()
		.x(function(d) { return d[0]; })
		.y(function(d) { return d[1]; })
		.interpolate("linear");

	let zigZag = svg.append("path")
		.attr("d", zigZagFunction(data))
		.attr("stroke", "#000000")
		.attr("stroke-width", 2)
		.attr("fill", "none");

	if(travel!=0){	
		update();
	}	

	function update(){
		let data = [];
		if(direction=='horizontal'){
			startX = startX + travel;
			data = genData(startX,startY,length,direction);
		} else {
			startY = startY + travel;
			data = genData(startX,startY,length,direction);			
		}

		zigZag.transition().duration(0)
			.attr("d", zigZagFunction(data));

		if(startX<-450 || startX>width ||startY<-450 || startY>height ){
			zigZag.remove();
			console.log('remove zigzag');
		} else {
			setTimeout(function(){update()},25);
		}
		
	}

	function genData(x,y,length,direction){
		let data = [];
		for(let i = 0;i<length;i++){
			if(i==0){
				if(direction=='horizontal'){
					data.push([x,pxToZig(x)+y]);
				} else {
					data.push([pxToZig(y)+x,y]);
				}
			} else if(i ==length-1) {
				if(direction=='horizontal'){
					data.push([x-10,pxToZig(x-10)+y]);
				} else {
					data.push([pxToZig(y-10)+x,y-10]);
				}
			} else {
				if(direction=='horizontal'){
					let newX = Math.floor(x/10)*10;
					data.push([newX,pxToZig(newX)+y]);
				} else {
					let newY = Math.floor(y/10)*10;
					data.push([pxToZig(newY)+x,newY]);
				}
			}
			if(direction=='horizontal'){
				x+=10;
			} else {
				y+=10;
			}
		}
		return data;
	}

	function pxToZig(num){
		let pos = num % 10
		if(pos == 0){
			let pos = Math.floor(num/10);
			if(isOdd(pos)){
				return -5;
			} else {
				return 5;
			}
		} else {
			let newPos = Math.floor(num/10);
			if(isOdd(newPos)){
				return pos-5;
			} else {
				return 5-pos;
			}
		}
	}

	function isOdd(num){
		return (num % 2) == 1;
	}
}

function randomZigZags(svg,width,height){
	let random = Math.random();
	if(random<0.2){
		console.log('new zigzag');
		let travel = Math.floor(Math.random()*2);
		let direction = Math.floor(Math.random()*2);
		let length = Math.floor(Math.random()*20) + 20;
		if(travel==0){
			travel = -5
		} else {
			travel = 5;
		}
		if(direction == 0){
			direction = 'horizontal';
		} else {
			direction = 'vertical';
		}
		if(direction=='horizontal'){
			if(travel ==5){
				x=-400;
			} else {
				x= width;
			}
			y = Math.floor(Math.random()*(height-20)) + 20;
		} else {
			if(travel ==5){
				y=-400;
			} else {
				y= height;
			}
			x = Math.floor(Math.random()*(width-20)) + 20;			
		}
		movingZigZag(svg,x,y,length,direction,travel,width,height);
	}
	setTimeout(function(){
		randomZigZags(svg,width,height)
	},250);
}


function movingCircle(svg,shape,colour,x,y,outline,size,rotation,speed,width,height){
    
    let circle = svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size)
        .style("fill-opacity",function(){if(outline==true){
        		return 0;
        	} else {
        		return 1;
        	}
        })
        .style("fill",colour)
        .style('stroke',colour)
        .style('stroke-width',2);

   	let newX = Math.sin(toRadians(rotation))*1500;
   	let newY = Math.cos(toRadians(rotation))*1500;

    circle.transition().duration((20-speed)*1000).ease('linear')
		.attr("cx", newX)
        .attr("cy", newY)
}

function randomShapes(layer,width,height){
	let random = Math.random();
	if(random<0.2){
		console.log('new circle');
		let x,y;
		let travel = Math.floor(Math.random()*2);
		let direction = Math.floor(Math.random()*2);
		let size = Math.floor(Math.random()*100) + 20;
		let rotation = 0;
		if(travel==0){
			travel = -5
		} else {
			travel = 5;
		}
		if(direction == 0){
			direction = 'horizontal';
		} else {
			direction = 'vertical';
		}
		if(direction=='horizontal'){
			if(travel ==5){
				x=-400;
				rotation = Math.floor(Math.random()*90) + 45;
			} else {
				x= width+200;
				rotation = Math.floor(Math.random()*90) + 225;
			}
			y = Math.floor(Math.random()*(height-20)) + 20;
		} else {
			if(travel ==5){
				y=-400;
				rotation = Math.floor(Math.random()*90) +135;
			} else {
				y= height+200;
				rotation = Math.floor(Math.random()*90) - 45;
			}
			x = Math.floor(Math.random()*(width-20)) + 20;			
		}
		movingCircle(layer,'circle','#000000',x,y,false,size,rotation,10,width,height);
	}
	
	setTimeout(function(){
		randomShapes(layer,width,height)
	},250);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function init(id){
	let width = $(id).width();
	let height = Math.max(window.innerHeight,600);

	let svg = d3.select(id).append("svg")
        .attr("width", width)
        .attr("height", height);

    let zigZagLayer = svg.append('g');

    let shapeLayer = svg.append('g');

	patternLogo(svg,width/2,height/2);
	
	randomZigZags(zigZagLayer,width,height);
	randomShapes(shapeLayer,width,height);
}

init("#page");


