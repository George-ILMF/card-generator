const fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var dir = path.join(__dirname, '/public');
app.use(express.static(dir));

app.listen(2302, function () {
    console.log('Listening on http://localhost:2302/');
});

app.get('/sendimagerequest', function (req, res) {    
    const url = req.originalUrl;
    var dir = path.join(__dirname, '/public/');
    console.log("request received")

    let name = req.query.name;
    let end = req.query.end;

    const { createCanvas, loadImage, Image, registerFont } = require('canvas')

    const canvas = createCanvas(850, 550)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "rgb(28, 82, 148)";
    ctx.roundRect(25, 25, 800, 500, 25);
    ctx.fill();

    const img = new Image(); // Create new img element
    img.onload = () => ctx.drawImage(img, 90, 180, 100, 95)
    img.src = "chip.png"; // Set source path

    const img2 = new Image(); // Create new img element
    img2.onload = () => ctx.drawImage(img2, 660, 450, 150, 55)
    img2.src = "visa.png"; // Set source path


    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "36px arial";
    ctx.fillText(name, 80, 450);

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "15px arial";
    ctx.fillText("GOOD", 270, 400);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "15px arial";
    ctx.fillText("THRU", 270, 415);

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "35px arial";
    ctx.fillText(end, 320, 415);


    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "55px arial";
    ctx.fillText("Visa Classic Debit", 80, 150);

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "55px arial";
    ctx.fillText("7123 1237 1277 1772", 80, 350);

    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r)

    const out = fs.createWriteStream(dir + r + ".png")
    console.log(r)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  res.send(r))
})

