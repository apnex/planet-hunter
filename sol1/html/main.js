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
var gLinks = two.makeGroup();

// return angle increment
function getAngle(seconds, frameCount) {
	let frameTotal = 60 * seconds;
	let frameCurrent = frameCount % frameTotal;
	return (360 / frameTotal) * frameCurrent * -1; // -1 to reverse direction
}

// calc position on orbit
function getPosition(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}

// scale down body radius as a square root against smallest body
function getRadius(radius, baseRadius, scale = 6) {
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
var pIndex = {};
var orbitDist = sunRadius;
var orbitPadding = 14;

// initial render // move entirely to update hook?
planets.forEach((item) => {
	// orbit radius
	let bodyRadius = getRadius(item.radius, baseRadius);
	orbitDist += orbitPadding;
	orbitDist += bodyRadius;

	// construct orbit
	var bodyOrbit = two.makeCircle(0, 0, orbitDist);
	bodyOrbit.noFill();
	bodyOrbit.linewidth = 1;
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
	pIndex[body.name] = body;
	gPlanets.add(planet);

	orbitDist += bodyRadius;
});

// sun
gSystem.add(gOrbits);
gSystem.add(gPlanets);
gSystem.add(gLinks);
gSystem.add(sun);

var drawingEvents = [];
var pLinks = {};
var drawOnce = 1;
two.bind("update", (frameCount) => {

	// get /bodies
	// forEach body { // hard sync to API
	//	body.object.translation.x = bodyPos.x;
	//	body.object.translation.y = bodyPos.y;
	// }

	// update bodies
	pStats.forEach((body) => {
		let orbitDuration = getOrbit(body.orbit, baseOrbit);
		let bodyPos = getPosition(getAngle(orbitDuration, frameCount), body.distance);
		body.object.translation.x = bodyPos.x;
		body.object.translation.y = bodyPos.y;
	});

	// progress drawing events
	drawingEvents.forEach((link) => {
		// get new pos x,y
		let srcPos = pIndex[link.src].object.translation;
		let dstPos = pIndex[link.dst].object.translation;

		// check if link exists
		let pLink = pLinks[link.src + '-' + link.dst];
		if(pLink != undefined) { // link exists
			// update pos x,y
			let points = pLink.vertices;
			points[0].x = srcPos.x;
			points[0].y = srcPos.y;
			points[1].x = dstPos.x;
			points[1].y = dstPos.y;

			// get length
			let length = pLink._renderer.elem.getTotalLength();
			//console.log('link.src: ' + link.src + ' | ' + link.dst + ' | length: ' + length);
			// check path completion?
			/*
			if(!pLink.complete) {
			// render along path?
			}
			*/
		} else { // create new link
			let line = two.makeLine(srcPos.x, srcPos.y, dstPos.x, dstPos.y);
			line.linewidth = 10;
			//line.fill = "#03a9f4";
			line.stroke = "#03a9f4";
			//line.stroke = "rgba(255, 0, 0)";
			line.opacity = 0.5;
			//line.dashes[0] = 10;
			pLinks[link.src + '-' + link.dst] = line;
			gLinks.add(line);
		}
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
function clickTest(name) {
	// create and register event
	drawingEvents.push({
		src: 'earth',
		dst: name
	});
};

sun._renderer.elem.id = 'sun';
pStats.forEach((body) =>{
	body.object._renderer.elem.id = body.name;
	body.object._renderer.elem.addEventListener('click', () => {
		clickTest(body.name);
	}, false);
});
drawingEvents.forEach((link) => {
	path.getTotalLength();
});
// add listener

// play animation loop
two.play();
