import ky from './ky.min.js';

// Returns a Promise that resolves after "ms" Milliseconds
function sleep(ms) {
	return new Promise((response) => {
		setTimeout(response, ms)
	});
}

async function start() {
	while(1) { // main loop
		let body = await checkStatus();
		let container = document.getElementById("status");
		container.innerText = body.status;
		if(body.status == 'healthy') {
			container.style.backgroundColor = colours['mGreen-500'];
		} else {
			container.style.backgroundColor = colours['mRed-300'];
		}
		console.log('body: ', body);
		//console.log(colours['mGreen-500']);
		await sleep(1000);
	}
}

async function checkStatus() {
	return await ky.get('http://localhost:4040/status').json();
}

start();

