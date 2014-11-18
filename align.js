var event = Sizzle('.event');
var event_after = Sizzle('.event:after');
var oldestYear = Number(event[0].getAttribute('event-year'));
var newestYear = oldestYear;
var yearMarkers = Sizzle("#divider span");
var i = 0;

// Loop through the events and find the oldest and newest years
for (i = event.length - 1; i >= 0; i--) {
	var event_year = Number(event[i].getAttribute('event-year'));
	if (event_year < oldestYear) oldestYear = event_year;
	if (event_year > newestYear) newestYear = event_year;
};

var yearRange = newestYear-oldestYear;
var yearIncrement = yearRange / (yearMarkers.length-1);

//Add the year labels
for (i = 0; i < yearMarkers.length; i++) {
	yearMarkers[i].innerHTML = oldestYear + (yearIncrement*i);
}

// Arrange the items
for (i = event.length - 1; i >= 0; i--) {
	var event_year = Number(event[i].getAttribute('event-year'));
	event[i].style.top = ((event_year - oldestYear) / yearRange) * 90 + '%';
	if (i % 2 == 0) { event[i].className = event[i].className + " right"; }
	else { event[i].className = event[i].className + " left"; }
};

Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};

function doCollide(elementOne, elementTwo) {
	var boxOne = elementOne.getBoundingClientRect(),
	    boxTwo = elementTwo.getBoundingClientRect();

    // Top-left corner
    if( boxTwo.right  < boxOne.left   || 
        boxTwo.bottom < boxOne.top    || 
        boxTwo.left   > boxOne.right  || 
        boxTwo.top    > boxOne.bottom ){
        	return false;
    } return true;
}

function respace(event) {
	var event = Sizzle('.event');
	document.body.style.fontSize = window.innerWidth / 100 + 'pt';
	_.each(Sizzle('h1 span'),         function(element) { element.style.fontSize = window.innerWidth /  40 + 'pt' });
	_.each(Sizzle('#divider span'),   function(element) { element.style.fontSize = window.innerWidth / 160 + 'pt' });
	_.each(Sizzle('.event year-pin'), function(element) { element.style.fontSize = window.innerWidth /  60 + 'pt' });
	for (i = event.length - 1; i >= 0; i--) {
		event[i].style.maxWidth = "49%";
		if (doCollide(event[i], Sizzle('#index')[0])) {
			event[i].style.maxWidth = document.body.clientWidth * 0.49 - Sizzle('#index')[0].offsetWidth - 45 +'px';
		}
	}
};

window.addEventListener('resize', _.debounce(respace, 500));
window.onload = respace;