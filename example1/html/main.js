import ky from './ky.min.js';

// Returns a Promise that resolves after "ms" Milliseconds
function sleep(ms) {
	return new Promise((response) => {
		setTimeout(response, ms)
	});
}

async function start() {
	while(1) { // main loop
		// get status
		checkStatus().then(async(body) => {
			// render table
			console.log("success body returned");
			await renderTable(body);
		}).catch((err) => {});

		// sleep
		await sleep(2000);
	}
}

async function checkStatus() {
	return await ky.get('http://localhost:4040/status').json();
}

async function renderTable(data) {
	let table = document.getElementById("status");

	// remove all rows
	table.innerHTML = "";

	data.items.forEach((item) => {
		// create a tile
		let rowCount = table.rows.length;
		let row = table.insertRow(rowCount);
	        let cell1 = document.createElement("td"); // create new row
		let div1 = document.createElement("div"); // create new div

		// set visual properties
		div1.className = "status";
		div1.innerText = item.status;
		if(item.status == 'healthy') {
			div1.style.backgroundColor = colours['mGreen-500'];
		} else {
			div1.style.backgroundColor = colours['mRed-300'];
		}

		// attach to table
		cell1.appendChild(div1);
		row.appendChild(cell1);
		table.appendChild(row);
	});

	console.log('data: ', data);
}

start();

