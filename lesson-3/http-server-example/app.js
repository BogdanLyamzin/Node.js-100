import http from "http";

const server = http.createServer((request, response)=>{
    const {url} = request;
    if(url === "/"){
        response.write("<h2>Home page</h2>");
    } else if(url === "/contacts") {
        response.write("<h2>Contacts page</h2>");
    } else {
        response.write("<h2>Not found</h2>");
    }
    response.end();
});

server.listen(3000, ()=> {
    console.log("Сервер запущен!");
});