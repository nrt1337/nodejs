const http = require("http");
const { parse } = require("querystring");

const HOST = "127.0.0.1";
const PORT = 8000;


let user = { user_agent: 0 };
let com = '';

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      console.log(`Получен ${req.method} - запрос на корневой элемент`);
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
    } 
    else if (req.url === "/comments"){
			console.log(`Получен ${req.method}-запрос на /comments`);
			res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
			res.end(`${com}`);
		}
    else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("400 Bad Request!");
    }
  } else if (req.method === "POST") {
    if (req.url === "/comments") {
      console.log(`Получен ${req.method} - запрос на /comments`);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

      let users = '';
      req.on("data", (chunk) => {
        users += chunk.toString();
      });
      req.on("end", () => {
        let param = JSON.parse(users);
        com += JSON.stringify(param);
        console.log(param);
        res.end("Данные успешно отправлены!");
      });
    } else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("400 Bad Request!");
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

server.on("connection", () => {
  console.log("Новое подключение");
});
