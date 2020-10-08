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

function getPosition(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}

var earthAngle = 0;
var moonAngle  = 0;
var distance   = 60;
var radius     = 20;
var padding    = 0;

// groups
var system	= two.makeGroup();
var orbits	= two.makeGroup();
var planets	= two.makeGroup();

// sun
var sun = two.makeCircle(0, 0, 70);
system.add(sun);

// orbit - earth
var earthOrbitRadius = 200;
var earthOrbit = two.makeCircle(0, 0, earthOrbitRadius);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = "#ccc";
orbits.add(earthOrbit);

// planet - earth
var pos = getPosition(0, earthOrbitRadius);
var earthRadius = 40;
var earth = two.makeCircle(pos.x, pos.y, earthRadius);
planets.add(earth);

// initial luna placement
var moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y, earthRadius + distance);
moonOrbit.noFill();
moonOrbit.linewidth = 4;
moonOrbit.stroke = "#ccc";
orbits.add(moonOrbit);

var moonRadius = 10;
var pos = getPosition(moonAngle, earthRadius + distance);
var moon = two.makeCircle(earth.translation.x + pos.x, earth.translation.y + pos.y, moonRadius);
planets.add(moon);
orbits.visible = true;

function getAngle(seconds, frameCount) {
	let frameTotal = 60 * seconds;
	let frameCurrent = frameCount % frameTotal;
	return (360 / frameTotal) * frameCurrent;
}

two.bind("update", (frameCount) => {
	// position earth
	let earthPos = getPosition(getAngle(365, frameCount), earthOrbitRadius);
	earth.translation.x = earthPos.x;
	earth.translation.y = earthPos.y;

	// position luna
	let moonPos = getPosition(getAngle(27, frameCount), earthRadius + distance);
	moon.translation.x = earth.translation.x + moonPos.x;
	moon.translation.y = earth.translation.y + moonPos.y;

	// match orbits
	moonOrbit.translation.x = earth.translation.x;
	moonOrbit.translation.y = earth.translation.y;
});
two.bind('resize', () => {
	system.translation.x = two.width / 2;
	system.translation.y = two.height / 2;
})


system.add(orbits);
system.add(planets);
system.translation.set(center.x, center.y);

// play animation loop
two.play();
//two.update();
sun._renderer.elem.id = 'sun';
earth._renderer.elem.id = 'earth';
moon._renderer.elem.id = 'luna';
