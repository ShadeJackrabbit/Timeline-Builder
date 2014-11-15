var event = Sizzle('.event');
var oldestYear = Number(event[0].getAttribute('event-year'));
var newestYear = oldestYear;
var i = 0;

// Loop through the events and find the oldest and newest years
for (i = event.length - 1; i >= 0; i--) {
	var event_year = Number(event[i].getAttribute('event-year'));
	if (event_year < oldestYear) oldestYear = event_year;
	if (event_year > newestYear) newestYear = event_year;
};

for (i = event.length - 1; i >= 0; i--) {
	var event_year = Number(event[i].getAttribute('event-year'));
	event[i].style.top = ((event_year - oldestYear) / (newestYear - oldestYear)) * 90 + '%';
	if (i % 2 == 0) {
		event[i].style.right = 51 + '%';
		event[i].style.textAlign = "right";
	} else {
		event[i].style.left = 51 + '%';
	}
};

Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};

function doCollide(elementOne, elementTwo) {
	var boxOne = elementOne.getBoundingClientRect();
	var boxTwo = elementTwo.getBoundingClientRect();

    // Top-left corner
    if( boxTwo.right  < boxOne.left   || 
        boxTwo.bottom < boxOne.top    || 
        boxTwo.left   > boxOne.right  || 
        boxTwo.top    > boxOne.bottom ){
        	return false;
    }
    return true;
}

function respace(event) {
	var event = Sizzle('.event');
	document.body.style.fontSize = Sizzle(window).offsetWidth / 100 + 'pt';
	for (i = event.length - 1; i >= 0; i--) {
		event[i].style.maxWidth = "49%";
		if (doCollide(event[i], Sizzle('#index')[0])) {
			console.log("Attempt "+i+" on collision detection.");
			console.log("Resizing...");
			var newWidth = document.body.clientWidth * 0.49 - Sizzle('#index')[0].offsetWidth - 45;
			console.log("Old size is "+event[i].offsetWidth+". Document is "+document.body.clientWidth+". Determining new size of "+newWidth+"...");
			event[i].style.maxWidth = newWidth +'px';
			console.log("Resizing complete. New size is "+event[i].offsetWidth);
		}
	}
};

window.addEventListener('resize', _.debounce(respace, 500));
window.onload = respace;