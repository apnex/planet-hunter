var el = document.getElementById('main');

var two = new Two({
	fullscreen: true
});
two.appendTo(el);

var cenX = document.body.offsetWidth / 2;
var cenY = document.body.offsetHeight / 2;

var earthAngle = 0,
	moonAngle  = 0,
	merAngle   = 90,
	venAngle   = 240,
	distance   = 20,
	radius     = 40,
	padding    = 100,
	orbit      = 500,
	merOrbit   = orbit / 4.2,
	venOrbit   = orbit / 3,
	earthOrbits = orbit / 2,
	orbits     = two.makeGroup();

//太阳球体
var sun = two.makeCircle(cenX, cenY, 80);
sun.stroke = 'yellow';
sun.linewidth = 10;
sun.fill = '#FE2E2E';

// 水星轨道
var mercuryOrbit = two.makeCircle(cenX, cenY, merOrbit);
mercuryOrbit.noFill();
mercuryOrbit.linewidth = 2;
mercuryOrbit.stroke = '#fff';
orbits.add(mercuryOrbit);

//水星球体
var pos = getPosition(merAngle++, merOrbit),
	mercury = two.makeCircle(pos.x + cenX, pos.y + cenY, 15);
mercury.fill = '#FF4000';
mercury.noStroke();

// 金星轨道
var venusOrbit = two.makeCircle(cenX, cenY, venOrbit);
venusOrbit.noFill();
venusOrbit.linewidth = 2;
venusOrbit.stroke = '#fff';
orbits.add(mercuryOrbit);

//金星球体
var pos = getPosition(venAngle++, venOrbit),
	venus = two.makeCircle(pos.x + cenX, pos.y + cenY, 25);
venus.fill = '#FF8000';
venus.noStroke();

// 地球轨道
var earthOrbit = two.makeCircle(cenX, cenY, earthOrbits);
earthOrbit.noFill();
earthOrbit.linewidth = 3;
earthOrbit.stroke = '#fff';
orbits.add(earthOrbit);

// 地球球体
var pos = getPosition(earthAngle++, earthOrbits),
	earth = two.makeCircle(pos.x + cenX, pos.y + cenY, radius);
earth.stroke = '#123456';
earth.lineWidth = 4;
earth.fill = '#01DFA5';

// 月球轨道
var moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y,
	radius + distance);
moonOrbit.noFill();
moonOrbit.lineWidth = 4;
moonOrbit.stroke = '#fff';
orbits.add(moonOrbit);

// 月球球体
var pos = getPosition(moonAngle, radius + distance),
	moon = two.makeCircle(earth.translation.x + pos.x, earth.translation.y + pos.y, radius / 4);
moon.noStroke();
moon.fill = '#F3F781';


two.bind('update', function(frameCount){
	// 水星旋转位置
	var pos = getPosition(merAngle++, merOrbit);
	mercury.translation.x = pos.x + cenX;
	mercury.translation.y = pos.y + cenY;

	// 金星旋转位置
	var pos = getPosition(venAngle++, venOrbit);
	venus.translation.x = pos.x + cenX;
	venus.translation.y = pos.y + cenY;

	// 地球旋转位置
	var pos = getPosition(earthAngle++, earthOrbits);
	earth.translation.x = pos.x + cenX;
	earth.translation.y = pos.y + cenY;

	//月球旋转位置
	var moonPos = getPosition(moonAngle++, radius + distance);
	moon.translation.x = earth.translation.x + moonPos.x;
	moon.translation.y = earth.translation.y + moonPos.y;
	moonAngle++;

	// 月球轨迹旋转位置 - 地球球体旋转位置
	moonOrbit.translation.x = earth.translation.x;
	moonOrbit.translation.y = earth.translation.y;
});

two.play();

// 获取圆周位置
function getPosition(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}
