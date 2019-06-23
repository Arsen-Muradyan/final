//Requires
var Grass = require('./class.grass')
var GrassEater = require('./class.grasseater')
var HerbivorouEater = require('./class.predator')
var Spider = require('./class.spider')
var Dragon = require('./class.dragon')
// Global Vairables
//Set Weather Settings
var n = 1;
var weathers = ['winter', 'spring', 'summer', 'autumn']
weather = weathers[1]
setInterval(() => {
    n+=0.1
    if (Math.round(n) >= 4) {
        n = 0
    }
    weather = weathers[Math.round(n)]
}, 300)

//Vairavles
matrix = [];
grassArr = [];
grassEaterArr = [];
herbivorouEaterArr = []
grassEaterWork = 0;
predatorWork = 0;
spiderWork = 0
dragonWork = {
    grass: 0,
    grassEater: 0,
    predator: 0,
    spider: 0,
}
spiderArr = []
dragonArr = []

//Matrix Generation settings
m = 50;
n = m
var mat = [];
function pushing(arr) {
    var d = [];
    for (var i = 0; i < m; i++) {
        var rand = Math.floor(Math.random() * 5)
        d.push(rand)
    }
    var randDragon = [0, 2, 3, 5, 0, 0]
    var randIndex = Math.floor(Math.random() * randDragon.length+1)
    d.push(randDragon[randIndex])   
    arr.push(d)
    return arr
}
for (var i = 0; i < n; i++) {
    matrix = pushing(mat)
}
//Server Settings
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
app.use(express.static('./'))
app.get('/', (req, res) => {
    res.redirect('index.html')
})
server.listen(3000)
//Creating Objects
function createObjects() {
    for (var y = 0; y < matrix.length; y++) {   
        for (var x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
            }
            else if (matrix[y][x] == 3) {
                var hret = new HerbivorouEater(x, y, 3)
                herbivorouEaterArr.push(hret)
            }
            else if (matrix[y][x] == 4) {
                var spider = new Spider(x, y, 4)
                spiderArr.push(spider)
            } 
            else if (matrix[y][x] == 5) {
                var dr = new Dragon(x, y, 5)
                dragonArr.push(dr)
            }
        }
    }   
}
createObjects()
grassLength = grassArr.length
grassEaterLength = grassEaterArr.length
predatorLength = herbivorouEaterArr.length
spiderLength = spiderArr.length 
dragonLength = dragonArr.length
// Run Players Methods
function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].dead();
    } 
    for (var i in herbivorouEaterArr) {
        herbivorouEaterArr[i].move();
        herbivorouEaterArr[i].eat();
        herbivorouEaterArr[i].mul()
        herbivorouEaterArr[i].dead();
    } 
    for (var i in spiderArr) {
        spiderArr[i].move();
        spiderArr[i].eat();
        spiderArr[i].mul()
        spiderArr[i].dead();
    } 
    for (var i in dragonArr) {
        dragonArr[i].move();
        dragonArr[i].eat();
        dragonArr[i].mul()
        dragonArr[i].dead();
    } 

    var sendData = {
        grassEat: grassEaterWork, 
        predatorEat: predatorWork,
        spiderEat: spiderWork,
        dragonEat: dragonWork,
        matrix,
        weather,
        grassLength,
        grassEaterLength,
        predatorLength,
        dragonLength,
        spiderLength,
    }
    io.sockets.emit("data", sendData)
}
setInterval(game, 1000)