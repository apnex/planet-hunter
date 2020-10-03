import ky from './ky.min.js';

async function demo() {
	bodyMethods();
}

async function bodyMethods() {
	console.log('with json()');
	var body = await ky.get('http://localhost:4040/status').json();
	console.log('body: ', body);
}

demo();

