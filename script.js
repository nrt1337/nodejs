const http = require("http");
const {parse} = require("querystring");

const HOST = "127.0.0.1";
const PORT = 8000;

let body = "";
let user = { user_agent: 0 };

const server = http.createServer((req, res) => {
	if (req.method === "GET") {
		if (req.url === "/") {
			console.log(`Получен ${req.method} - запрос на /stats`); //НА КОРНЕВОЙ ЭЛЕМЕНТ
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end("Привет!");
		} else if (req.url === "/stats") {
			console.log(`Получен ${req.method} - запрос на /stats`);
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			user.user_agent++;
			res.end(`<table>
			<tr><td>User-agent:</td>
			<td>Request:</td></tr>
			<tr><td>${req.headers["user-agent"]}</td>
			<td>${user.user_agent}</td></tr>
			</table>`);
		} else {
			res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
			res.end("400 Bad Request!");
		}

		if (req.method === "POST") {
			if (req.url === "/comments") {
				console.log(req.method);
				res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
				
				req.on("data", (chunk) => {
					body += chunk.toString();
				});
				req.on("end", () => {
					let params = parse(body);
					console.log(params);
					res.end("Данные успешно отправлены!");
				});
			} else {
				res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
				res.end("400 Bad Request!");
			}
		}
	}
});

server.listen(PORT, HOST, () => {
	console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

server.on("connection", () =>{
	console.log("Новое подключение");
});

//server.on('error', err => {
//	if (err.code  === 'EACCES'){
//		console.log(`No access to port: ${PORT}`);
//	}
//});
