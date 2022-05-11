// Linus movement
$('#forward').on('mousedown', function(){
	$.get('/forward');
	});
$('#forward').on('mouseup', function(){
	$.get('/stop');
	});
$('#backward').on('mousedown', function(){
	$.get('/backward');
	});
$('#backward').on('mouseup', function(){
	$.get('/stop');
	});
$('#left').on('mousedown', function(){
	$.get('/left');
	});
$('#left').on('mouseup', function(){
	$.get('/stop');
	});
$('#right').on('mousedown', function(){
	$.get('/right');
	});
$('#right').on('mouseup', function(){
	$.get('/stop');
	});
	
// Torvalds movement
$('#north').on('mousedown', function(){
	$.get('/north');
	});
$('#north').on('mouseup', function(){
	$.get('/stop2');
	});
$('#south').on('mousedown', function(){
	$.get('/south');
	});
$('#south').on('mouseup', function(){
	$.get('/stop2');
	});
$('#west').on('mousedown', function(){
	$.get('/west');
	});
$('#west').on('mouseup', function(){
	$.get('/stop2');
	});
$('#east').on('mousedown', function(){
	$.get('/east');
	});
$('#east').on('mouseup', function(){
	$.get('/stop2');
	});
// Servo movement
$('#min').on('mousedown', function(){
	$.get('/min');
	});
$('#mid').on('mousedown', function(){
	$.get('/mid');
	});
$('#max').on('mousedown', function(){
	$.get('/max');
	});
$('#min2').on('mousedown', function(){
	$.get('/min2');
	});
$('#mid2').on('mousedown', function(){
	$.get('/mid2');
	});
$('#max2').on('mousedown', function(){
	$.get('/max2');
	});
// PWM Motors
$('#fifty').on('mousedown', function(){
	$.get('/half');
	});
$('#full').on('mousedown', function(){
	$.get('/full');
	});
// Eye blink
$('#linus').on('mousedown', function(){
	$.get('/eyeon');
	});
$('#linus').on('mouseup', function(){
	$.get('/eyeoff');
	});
$('#torvalds').on('mousedown', function(){
	$.get('/torvaldson');
	});
$('#torvalds').on('mouseup', function(){
	$.get('/torvaldsoff');
	});
