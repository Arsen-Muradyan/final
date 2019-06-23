var n = 0;
function setup() {
    var socket = io();
    var side = 10;
    var matrix = [];
    createCanvas(500, 500)
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterElement = document.getElementById('grassEaterCount')
    let predatorElement = document.getElementById('predatorCount')
    let spiderElement = document.getElementById('spiderCount')
    let dragonElement = document.getElementById('dragonCount')
    var weatherElement = document.getElementById('weather')
    let grassEaterEat = document.getElementById('grassEaterEat')
    let predatorEatElement = document.getElementById('predatorEat')
    let spiderEatElement = document.getElementById('spiderEat')
    let dragonEatElement = document.getElementById('dragonEat')
    var backinput = document.getElementById('back')
    backinput.onkeydown = e => {
        document.body.style.backgroundColor = e.target.value
    }
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        //Matirxi to string
        //find objects with matrix number
        var grassLength = data.grassLength
    
        //Set Default Length in Objects
        var grassEaterLength = data.grassEaterLength 
        var predatorLength = data.predatorLength
        var spiderLength = data.spiderLength
        var dragonLength = data.dragonLength
        
        //Check how many item eat objects
        var grassEat = data.grassEat; 
        var predatorEat = data.predatorEat
        var spiderEat = data.spiderEat
        var dragonEat = data.dragonEat
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) { 
                if (matrix[y][x] === 1 && data.weather === 'winter') {
                    fill('blue')
                }  
                else if (matrix[y][x] == 1 && data.weather !== 'winter') {
                    fill("green");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red");
                }
                else if (matrix[y][x] == 4) {
                    fill("#333")
                }
                else if (matrix[y][x] == 5) {
                    fill('orange')
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                rect(x * side, y * side, side, side);
            }
        }
        grassCountElement.innerText = grassLength === 0 ? 'Չի ծնվել' : grassLength
        grassEaterElement.innerHTML = `${grassEaterLength}`
        grassEaterEat.innerHTML = grassEat
        predatorElement.innerHTML = predatorLength
        predatorEatElement.innerHTML = predatorEat
        spiderElement.innerHTML =  spiderLength
        spiderEatElement.innerHTML =  spiderEat
        dragonElement.innerHTML =  dragonLength
        dragonEatElement.innerHTML = `  ${dragonEat.grass} խոտ, ${dragonEat.spider} սարդ, ${dragonEat.grassEater} խոտակեր, ${dragonEat.predator} գիշատիչ`
        weatherElement.innerHTML = data.weather
        
    }
}