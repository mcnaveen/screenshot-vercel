import express from "express";
const app = express();
import puppeteer from "puppeteer";

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.get('/screenshot', (req, res) => {
    const url = req.query.url || 'https://google.com';
    const width = req.query.width || 1280;
    const height = req.query.height || 720;

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({ width: Number(width) || 1280, height: Number(height) || 720, deviceScaleFactor: 2 });
        res.type('image/png');
        res.send(await page.screenshot({ type: 'png' }));
    })();
})

app.listen(3000, () => {
    console.log("App running")
})