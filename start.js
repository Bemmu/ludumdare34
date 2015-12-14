$(function () {
	preload();
});

function start() {
	//playSound("pain");
	click = function () { 
		click = function () { };

//		wheelchair();		
//		letsHaveACode();
		canYouHearMe();
	
//		junction();

//		roomFront();

//		cafe();
//		cafeNavi();
//		roomNorthNavigate();
		$('.fadeWhenStarted').fadeOut();		
	}
}

function instructions() {
	$('button').attr('disabled', true);
	playSound("instructions", function () { 
		$('button').attr('disabled', false);
	});
}

function l(str) {
	if (console && console.log) {
		console.log(str);
	}
}

/*var preload = {
	"0" : T("audio", {loop: false}).load("0.wav"),
	"1" : T("audio", {loop: false}).load("1.wav"),
	"2" : T("audio", {loop: false}).load("2.wav"),
	"3" : T("audio", {loop: false}).load("3.wav"),
	"4" : T("audio", {loop: false}).load("4.wav"),
	"5" : T("audio", {loop: false}).load("5.wav"),
	"pain" : T("audio", {loop: false}).load("pain.wav"),
	"dont" : T("audio", {loop: false}).load("dont.wav"),
	"wheel" : T("audio", {loop: false}).load("wheel.wav"),
	"news" : T("audio", {loop: false}).load("news.wav"),
	"meds" : T("audio", {loop: false}).load("meds.wav"),
	"euthanasia" : T("audio", {loop: false}).load("euthanasia.wav"),
	"putting" : T("audio", {loop: false}).load("putting.wav"),
	"roomfront" : T("audio", {loop: false}).load("roomfront.wav"),
	"poster" : T("audio", {loop: false}).load("poster.wav"),
	"readit" : T("audio", {loop: false}).load("readit.wav"),
	"roomNorthNavigate" : T("audio", {loop: false}).load("roomNorthNavigate.wav"),
	"puppy" : T("audio", {loop: false}).load("puppy.wav"),
	"posterAgain" : T("audio", {loop: false}).load("posterAgain.wav"),
	"east" : T("audio", {loop: false}).load("east.wav"),
	"west" : T("audio", {loop: false}).load("west.wav"),
	"north" : T("audio", {loop: false}).load("north.wav"),
	"south" : T("audio", {loop: false}).load("south.wav"),
	"cafe" : T("audio", {loop: false}).load("cafe.wav"),
	"cafenavi" : T("audio", {loop: false}).load("cafenavi.wav"),
	"cafeagain" : T("audio", {loop: false}).load("cafeagain.wav"),
	"outside" : T("audio", {loop: false}).load("outside.wav"),
	"nursePresent" : T("audio", {loop: false}).load("nursePresent.wav"),
	"nurseAway" : T("audio", {loop: false}).load("nurseAway.wav"),
	"presNavi" : T("audio", {loop: false}).load("presNavi.wav"),
	"pills" : T("audio", {loop: false}).load("pills.wav"),
	"empty" : T("audio", {loop: false}).load("empty.wav"),
	"junction" : T("audio", {loop: false}).load("junction.wav"),
	"howabouteast" : T("audio", {loop: false}).load("howabouteast.wav"),
	"shouldwepresssforfun" : T("audio", {loop: false}).load("shouldwepresssforfun.wav"),
	"nothingelse" : T("audio", {loop: false}).load("nothingelse.wav"),
	"onlybutton" : T("audio", {loop: false}).load("onlybutton.wav")
}
var loadThese = [];
for (var i in preload) {
	loadThese.push(preload[i]);
}
$.when(loadThese).then(function() {
	$('#ready').show();
	$('#loading').hide();
	l("all loaded");
});*/

var click = function () { };

var bpm = 40;
var heartbeatPos = 0;
var heartbeatOn = true;
var talkerPos = 0.6;
var tapTimes = 0;
var tapTimer = null;
var oneTap = null;
var twoTaps = null;
var taps = null;

var hasMedicine = false;
var medicineTaken = 0;
var lettersRead = 0;

//var reverb = T("reverb", {room:0.6, damp:1.0, mix:0.45});

//var out = T("+", cafe);

function tappedNTimes(n) {
	if (taps) taps(n);
	if (n === 1 && oneTap) oneTap();
	if (n === 2 && twoTaps) twoTaps(); 
}

function timerFired() {
	tappedNTimes(tapTimes);
	clearTimeout(tapTimer);
	tapTimer = null;
	tapTimes = 0;
}

function tap() {
	// Tapping once means that you press, then within 1 second there isn't another tap
	// Tapping twice means that you press, then within 1 second you press again, then for 1 second there isn't another tap
	// So if there is a tap, need to know if there was another one within the previous second.
	l('tap');
//	preload["4"].context.bang().play();
	playSound("4");
	click();

	tapTimes++;
	if (tapTimer) {
		clearTimeout(tapTimer);
	}
	tapTimer = setTimeout(timerFired, 1000);
}

function next() {
//	reverb.play();
	heartbeat();

//	T("pluck", {freq:200, mul:0.01}).bang().play();
	$('#start').hide();
	if (/iPad|iPhone|iPod/.test(navigator.platform)) {
		$('#ios').show();
		$('#browser').hide();
	} else {
		$('#browser').show();
		$('#ios').hide();
	}
	$('#started').show();

	document.ontouchstart = function(e) { 
		tap();
	    e.preventDefault(); 
	}

	$('body').click(function(e) {
		tap();
		e.preventDefault(); 
	});

	var spaceDown = false;
	$('body').keydown(function(e) {
		if (e.keyCode === 32) {
			if (!spaceDown) {
				tap();
			}
			spaceDown = true;
			e.preventDefault(); 
		}
	});
	$('body').keyup(function(e) {
		if (e.keyCode === 32) {
			spaceDown = false;
		}		
	});

	setTimeout(start, 100);
}

function think(phrase, delay, callback) {
	say(phrase, delay, callback, true);	
}

function tapTwiceIfUnderstand() {
	say("3", 1000, function () {
		taps = function (n) {
			taps = function () { };
			l("got " + n + " taps");
			if (n === 2) {
				letsHaveACode();
			} else {
				taps = function () { };
				say("dont", 1000, function () {
					tapTwiceIfUnderstand();
				});
			}
		}
	});
}

var beenInWheelChairBefore = false;
var beenInCafeBefore = false;

function cafeNavi() {
	ask("threedir", function () { 
		say("east", 1000, function () { 
			l("calling roomnorth");
			roomNorth();
		});
	}, function () { 
		ask("cafenavi", function () { 
			say("north", 1000, function () { 
				say("outside", 1000, function () { 
					say("south", 1000, function () { 
						cafe();
					});
				});
			});
		}, function () { 
			say("south", 1000, prescriptionDesk);
		});		
	});
}

var fireAlarm = null;

function turnOnAlarm() { 
	fireAlarm = setInterval(function () { 
		playSound("alarm");		
	}, 4000);
}

function alarm() { 
	if (fireAlarm) {
		say("onlybutton", 1000, function () { 
			say("nothingelse", 1000, function () { 
				say("west", 1000, junction);
			});
		});
	} else {
		ask("shouldwepresssforfun", function () { 
			turnOnAlarm();
			say("nothingelse", 1000, function () { 
				say("west", 1000, junction);
			});
		}, function () { 
			say("nothingelse", 1000, function () { 
				say("west", 1000, junction);
			});			
		});
	}
}

function couldStopAlarm(callback) {
	l("couldStopAlarm");
	if (hasMedicine && fireAlarm) {
		clearInterval(fireAlarm);
		fireAlarm = null;
		playSound("someonestopped", callback);
	} else {
		callback();
	}
}

function junction() {
	couldStopAlarm(function () { 
		ask("junction", function () { 
			l("going west from junction");
			say("west", 1000, prescriptionDesk);
		}, function () { 
			ask("howabouteast", function () { 
				say("east", 1000, alarm);
			}, function () { 
				say("north", 1000, roomFront);
			});
		});		
	});
}

function prescriptionDeskNavi() { 
	ask("presNavi", function () { 
		say("north", 1000, cafe);
	}, function () { 
		say("east", 1000, junction);		
	});
}

function steal() {
	if (hasMedicine) {
		say("empty", 1000, prescriptionDeskNavi);
	} else {
		say("pills", 1000, prescriptionDeskNavi);
		hasMedicine = true;
	}
}

function prescriptionDesk() { 
	l("arrive at prescription desk");
	if (fireAlarm) {
		ask("nurseAway", steal, prescriptionDeskNavi);
	} else {
		say("nursePresent", 1000, prescriptionDeskNavi);
	}
}

function cafe() {
	l("in cafe");
	couldStopAlarm(function () { 
		if (beenInCafeBefore) {
			say("cafeagain", 1000, function () { 
				cafeNavi();
			});
		} else {
			beenInCafeBefore = true;
			say("cafe", 1000, function () { 
				cafeNavi();
			});
		}
	});
}

function roomNorthNavigate() {
	ask("northjunction", function () { 
		say("east", 1000, function () { 
			say("puppy", 1000, function () { 
				say("west", 1000, function () { 
					say("posterAgain", 1000, roomNorth);					
				});
			});			
		});		
	}, function () { 
		ask("howaboutwest", function () { 
			say("west", 1000, function () { 
				l("going west");					
				cafe();
			});
		}, function () { 
			say("south", 1000, function () { 
				l("going south");					
				roomFront();
			});
		});
	});
}

function roomNorth() { 
	l("roomNorth");
	ask("readit", function () { 
		l("readit end");
		say("poster", 1000, roomNorthNavigate);
	}, function () { 
		l("calling roomNorthNavigate");
		roomNorthNavigate();
	});
}

function roomFront() {
	heartbeatOn = false;
	if (hasMedicine) {
		say("letsgoback", 1000, function () { 
			heartbeatOn = true;
			menu();
		});
	} else {
		ask("roomfront", function () { 
			say("south", 1000, junction);
		}, function () { 
			say("north", 1000, roomNorth);		
		});
	}
}

function wheelchair() { 
	if (!beenInWheelChairBefore) {
		say("putting", 1000, function () { 
			beenInWheelChairBefore = true;		
			roomFront();
		});
	} else {
		roomFront();
	}
}

function newspaper() {
	say("euthanasia", 1000, function () { 
		menu();
	});
}


function letter() { 
	playSound("letter" + lettersRead, menu);
	lettersRead++; 
}

function askMeds() {
	ask("meds", function () { 
		l("take meds");
		bpm += 60;
		if (bpm > 200) {
			heartbeatOn = false;
			playSound("death", function () { 
				$('#started').fadeOut();
			});
		} else {
			menu();
		}
	}, menu);				
}

function menu() { 
	if (hasMedicine) {
		if (lettersRead == 0 || lettersRead == 1) {
			ask("letter", letter, function () { 
				askMeds();
			});				
		} else {
			playSound("nomoreletters", askMeds);
		}
	} else {
		ask("wheel", wheelchair, function () { 
			ask("news", newspaper, function () { 
				menu();
			});
		});
	}
}

function letsHaveACode() {
	say("5", 1000, function () {
		taps = function (n) {
			taps = function () { };
			l("got " + n + " taps");
			if (n === 2) {
				menu();
			} else {
				say("dont", 1000, function () {
					letsHaveACode();
				});
			}
		};
	});
}

function ask(phrase, yesCallback, noCallback) { 
	taps = function () { };
	l("asking: " + phrase);
	var stillWaiting = null;
	say(phrase, 1000, function () {
		taps = function (n) { 
			if (stillWaiting) clearInterval(stillWaiting);
			if (n === 2) {
				taps = function () { };
				l("answered yes");
				yesCallback();
			} else if (n === 1) {
				taps = function () { };
				l("answered no");
				noCallback();
			} else {
				l("tapped so many times");
				playSound("justonceortwice");
			}
		};

		stillWaiting = setInterval(function () { 
			var tmp = taps;
			taps = function () { };
			playSound("stillwaiting", function () { 
				clearInterval(stillWaiting);
				taps = tmp;
			});
		}, 5000);
	});
}

function sawAFingerMove() { 
	say("1", 500, function () { 
		setTimeout(function () { 
			bpm += 40;
		}, 6000);
		setTimeout(function () { 
			bpm -= 10;
		}, 10000);
		setTimeout(function () { 
			bpm -= 10;
		}, 14000);
		setTimeout(function () { 
			bpm -= 10;
		}, 18000);
		say("2", 1000, function () { 
			tapTwiceIfUnderstand();
		});
	});
}

function canYouHearMe() { 
	click = function () { };
	var fingerMoved = false;
	click = function () { 
		fingerMoved = true;
	}
	say("0", 1000, function () {
		l("call");
		if (fingerMoved) {
			sawAFingerMove();
		} else {
			canYouHearMe();
		}
	});	
}

var preloaded = {};
var totalSounds = 0;

function preload() {
	var sounds = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"alarm",
		"beep",
		"cafe",
		"cafeagain",
		"cafenavi",
		"death",
		"dont",
		"east",
		"empty",
		"euthanasia",
		"howabouteast",
		"howaboutwest",
		"instructions",
		"junction",
		"justonceortwice",
		"letsgoback",
		"letter",
		"letter0",
		"letter1",
		"meds",
		"news",
		"nomoreletters",
		"north",
		"northjunction",
		"nothingelse",
		"nurseaway",
		"nursepresent",
		"onlybutton",
		"outside",
		"pain",
		"pills",
		"poster",
		"posterAgain",
		"presnavi",
		"puppy",
		"putting",
		"readit",
		"roomNorthNavigate",
		"roomfront",
		"shouldwepresssforfun",
		"someonestopped",
		"south",
		"stillwaiting",
		"threedir",
		"west",
		"wheel"
	];
	for (var i in sounds) {
		totalSounds++;
		var fn = 'mp3/' + sounds[i] + '.mp3';
		preloaded[sounds[i]] = new Audio(fn);
		preloaded[sounds[i]].oncanplay = loadedOneSound;
	}
	$('button').attr('disabled', true);
}

var loadedSounds = 0;
function loadedOneSound() {
	loadedSounds++;
	$('#progress').text("" + loadedSounds + " / " + totalSounds);
	if (loadedSounds === totalSounds) {
		$('button').attr('disabled', false);
		$('#loading').fadeOut();
	}
}

function playSound(phrase, callback) {
	var fn = 'mp3/' + phrase + '.mp3';
	l("Playing sound " + fn);
	var audio = new Audio(fn);
//	var audio = preloaded[phrase];
	if (typeof callback === "function") {
		audio.onended = callback;
	}
	audio.play();
}

function say(phrase, delay, callback, isThought) {
	setTimeout(function () {
		playSound(phrase, callback);
	}, delay|0);
}

// This will slow down when changing tab. Cannot be helped, because browser
// clamps timers to 1000ms when not active. 
function heartbeat() {
	if (heartbeatOn) {
		playSound('beep');
	}
	setTimeout(heartbeat, (1000*60)/bpm);
}
