/* ==========================================================================
   Flucss script by veli.ee
   CSS styles based on sunset and sunrise for visitor location. Like F.lux, for the web. 
   http://veli.ee/flucss
   ========================================================================== */


   (function ( $ ) {
   	$.fn.flucss = function( options ) {

        // default options
        var options = $.extend({
        	black: false
        }, options );

// check localstorage support, get state from localstorage to avoid flickering when navigating or reloading
if (typeof(Storage) !== "undefined") {
	var storeddaytimename = localStorage.getItem("daytimename")
	if(storeddaytimename){
		$("html").addClass(storeddaytimename);
	}
} else { }
// get users location
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
	} else { } // no geolocation support

// the main function to get active (closest) sun state
// you MUST INCLUDE https://github.com/mourner/suncalc for calculating the sun states
function showPosition(position) {
	// get all sun states, displayed in an object
	var times = SunCalc.getTimes(new Date(), position.coords.latitude, position.coords.longitude);
	var now = new Date();
	var currenttime = now.getTime();
	var daytimename = ""; // will get the active name for the sun state, all possible values: 
	// sunrise, sunriseEnd, goldenHourEnd, solarNoon, goldenHour, sunsetStart, sunset, dusk, nauticalDusk, night, nadir, nightEnd, nauticalDawn, dawn
	
	// variables to store current time and sun state differences 
	var curr = times.sunrise.getTime();
	var diff = Math.abs (currenttime - curr);

	for (var property in times) {
		if (times.hasOwnProperty(property)) {
			var newdiff = Math.abs (currenttime - times[property].getTime());
			if (newdiff < diff) {
				diff = newdiff;
				curr = times[property].getTime();
				daytimename = property;
				localStorage.setItem("daytimename", property); // set localstorage, to avoid flickering when geolocation is reached
			}
		}
	}
	// adds the appropriate class to root HTML element
	// add the class ".fullblack" to your "HTML" element, if you want night to be completely black
}

this.each(function() {
	var element = $( this );
	element.addClass(localStorage.getItem("daytimename")); 
	if(options.black){
		element.addClass("fullblack"); 
	}
});

return this;


};
}( jQuery ));




































