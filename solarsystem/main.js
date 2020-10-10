console.log('moo');
var el = document.getElementById("main");
var two = new Two({
	fullscreen: true
});
two.appendTo(el);

// anchor
var center = {
	x: two.width / 2,
	y: two.height / 2
};

// groups
var gSystem = two.makeGroup();
var gOrbits = two.makeGroup();
var gPlanets = two.makeGroup();

// return angle increment
function getAngle(seconds, frameCount) {
	let frameTotal = 60 * seconds;
	let frameCurrent = frameCount % frameTotal;
	return (360 / frameTotal) * frameCurrent;
}

// calc position on orbit
function getPosition(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}

// scale down body radius as a square root against smallest body
function getRadius(radius, baseRadius, scale = 4) {
	return Math.sqrt(radius / baseRadius) * scale;
}

// scale down body orbit period as a square root against fastest body
function getOrbit(orbit, baseOrbit, scale = 60) {
	return Math.sqrt(orbit / baseOrbit) * scale;
}

// find smallest body radius
const radiusArr = planets.map((body) => body.radius);
const baseRadius = Math.min(...radiusArr);

// find fastest body orbit
const orbitArr = planets.map((body) => body.orbit);
const baseOrbit = Math.min(...orbitArr);

// make sun
var item = {
	"name": "sun",
	"radius": 695508,
	"distance": 0,
	"orbit": 0
};
var sunRadius = getRadius(item.radius, baseRadius);
var sun = two.makeCircle(0, 0, getRadius(item.radius, baseRadius));

// testing
var pStats = [];
var orbitDist = sunRadius;
var orbitPadding = 14;

planets.forEach((item) => {
	// orbit radius
	let bodyRadius = getRadius(item.radius, baseRadius);
	orbitDist += orbitPadding;
	orbitDist += bodyRadius;

	// construct orbit
	var bodyOrbit = two.makeCircle(0, 0, orbitDist);
	bodyOrbit.noFill();
	bodyOrbit.linewidth = 2;
	bodyOrbit.stroke = "#aaaaaa";
	gOrbits.add(bodyOrbit);

	// construct body
	let body = {
		'name': item.name,
		'radius': bodyRadius,
		'distance': orbitDist,
		'orbit': item.orbit
	};
	let pos = getPosition(0, body.distance);
	let planet = two.makeCircle(pos.x, pos.y, body.radius);
	body['object'] = planet;
	pStats.push(body);
	gPlanets.add(planet);

	orbitDist += bodyRadius;
});

// sun
gSystem.add(gOrbits);
gSystem.add(gPlanets);
gSystem.add(sun);

two.bind("update", (frameCount) => {
	// update bodies
	pStats.forEach((body) => {
		//let orbitDuration = body.orbit * 365;
		let orbitDuration = getOrbit(body.orbit, baseOrbit);
		let bodyPos = getPosition(getAngle(orbitDuration, frameCount), body.distance);
		body.object.translation.x = bodyPos.x;
		body.object.translation.y = bodyPos.y;
	});
});
two.bind('resize', () => {
	gSystem.translation.x = two.width / 2;
	gSystem.translation.y = two.height / 2;
})

gOrbits.visible = true;
gSystem.translation.set(center.x, center.y);

// render first frame;
two.update();

// post render hooks
sun._renderer.elem.id = 'sun';
pStats.forEach((body) =>{
	body.object._renderer.elem.id = body.name;
});

// add listener
function clickTest(el) {
	console.log('something clicked: ' + JSON.stringify(el, null, "\t"));
};
sun._renderer.elem.addEventListener('click', clickTest, false);

// play animation loop
two.play();
