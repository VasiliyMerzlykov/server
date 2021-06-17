const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const port = process.env.PORT || 7070;

app.use(koaBody({
    urlencoded: true,
    multipart: true,
}));

const list = [
    { name: "vasya", lastName: "Merzlyakov" },
    { name: "Petya", lastName: "Petrov" },
    { name: "Kolya", lastName: "Ivanov" }
];

app.use(async (ctx) => {
    const { name, phone } = ctx.request.body;
    ctx.response.set({
        'Access-Control-Allow-Origin': '*',
    });

    if (ctx.method === "GET") {
        ctx.response.body = list;
        return
    }

    if (ctx.method === "POST") {
        console.log("URA")
        const { name, lastName } = ctx.request.body;
        list.push({ name, lastName })
        ctx.response.body = list;
    }
});


const server = http.createServer(app.callback()).listen(port)