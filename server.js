const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const app = new Koa();
app.use(koaBody({
    urlencoded: true,
    multipart: true,
}));
const router = new Router()

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


const server = http.createServer(app.callback()).listen(7070);