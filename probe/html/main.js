import ky from './ky.min.js';

// Returns a Promise that resolves after "ms" Milliseconds
function sleep(ms) {
	return new Promise((response) => {
		setTimeout(response, ms)
	});
}

async function start() {
	var data = [];
	while(1) { // main loop
		// get status
		checkStatus().then(async(body) => {
			// render table
			data = body;
			await renderTable(body);
		}).catch(async(err) => {
			console.log(JSON.stringify(data, null, "\t"));
			data.items.forEach((item) => {
				item.status = 'unknown';
			});
			await renderTable(data);
		});

		// sleep
		await sleep(2000);
	}
}

async function checkStatus() {
	return await ky.get('http://localhost:4040/probes').json();
}

async function renderTable(data) {
	let table = document.getElementById("probes");

	// remove all rows
	table.innerHTML = "";

	data.items.forEach((item) => {
		// create a tile
		let rowCount = table.rows.length;
		let row = table.insertRow(rowCount);
	        let cell1 = document.createElement("td"); // create new row
		let div1 = document.createElement("div"); // create new div

		// set visual properties
		div1.innerText = item.status;
		switch(item.status) {
			case('healthy'):
				div1.className = 'healthy';
				break;
			case('broken'):
				div1.className = 'broken';
				break;
			default:
				div1.className = 'unknown';
				break;
		}

		// attach to table
		cell1.appendChild(div1);
		row.appendChild(cell1);
		table.appendChild(row);
	});

	console.log('data: ', data);
}

start();
