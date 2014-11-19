function $(selector) { return Sizzle(selector); }

var event = $('.event');
var event_after = $('.event:after');
var oldestYear = Number(event[0].getAttribute('event-year'));
var newestYear = oldestYear;
var yearMarkers = $("#divider span");
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

// Check for a collision between two elements
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

// Arrange the items
for (i = 0; i < event.length; i++) {
	var event_year = Number(event[i].getAttribute('event-year'));
	event[i].style.top = ((event_year - oldestYear) / yearRange) * 90 + '%';
};

Number.prototype.between  = function (a, b) {
    var min = Math.min.apply(Math, [a,b]),
        max = Math.max.apply(Math, [a,b]);
    return this > min && this < max;
};

// Line everything properly up
function respace(event) {
	var event = $('.event');
	document.body.style.fontSize = window.innerWidth / 45 + 'pt';
	_.each($('#divider span'),   function(element) { element.style.fontSize =  window.innerWidth / 40 + 'pt' });
	for (i = 0; i < event.length; i++) {
		if (doCollide(event[i], $('#index')[0])) {
			event[i].style.maxWidth = document.body.clientWidth * 0.49 - $('#index')[0].offsetWidth - 45 +'px';
		}
		if (i > 0) {
			while (doCollide(event[i], event[i-1])) {
				event[i].style.left = event[i].getBoundingClientRect().left + window.innerWidth / 3 + 25 + 'px';
			}
		}
	}
	_.each($('.event year-pin'), function(element) {
		element.style.fontSize =  window.innerWidth / 25 + 'pt';
		element.style.left     =  -element.getBoundingClientRect().left + window.innerWidth /  6 + 'px';
	});
	_.each($('.event .title span'), function(element) {
		element.style.left     =  -element.getBoundingClientRect().left + window.innerWidth / 15 + 'px';
	});
};

window.addEventListener('resize', _.debounce(respace, 500));
window.onload = respace;