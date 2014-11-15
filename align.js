var event = $('.event');
var oldestYear = Number(event[0].getAttribute('event-year'));
var newestYear = oldestYear;

// Loop through the events and find the oldest and newest years
for (var i = event.length - 1; i >= 0; i--) {
	event_year = Number(event[i].getAttribute('event-year'));
	if (event_year < oldestYear) oldestYear = event_year;
	if (event_year > newestYear) newestYear = event_year;
};

for (var i = event.length - 1; i >= 0; i--) {
	event_year = Number(event[i].getAttribute('event-year'));
	event[i].style.top = ((event_year - oldestYear) / (newestYear - oldestYear)) * 90 + '%';
	console.log(event[i].style.top);
	if (i % 2 == 0) {
		event[i].style.right = 51 + '%';
		event[i].style.textAlign = "right";
	} else {
		event[i].style.left = 51 + '%';
	}
};