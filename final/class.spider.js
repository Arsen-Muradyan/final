var LivingCreature = require('./general')
var random = require('./random')
module.exports = class Spider extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 4;
    }
   
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {
        var newCell4 = random(this.chooseCell(4))
        var newCell2 = random(this.chooseCell(2)) 
        var newCell1 = random(this.chooseCell(1))
        var newCell0 = random(this.chooseCell(0))
        var newCell
        var arr = []
        var cells = [newCell0, newCell1, newCell2,newCell4]
        for (var i in cells) {
            if (typeof cells[i] == "object") {
                newCell = arr.concat(cells[i])
            }
        }        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 4) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index
                this.y = newY;
                this.x = newX;
            }
            else if(matrix[newY][newX] == 2) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
            }
            else if(matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
            }
            else if(matrix[newY][newX] == 0) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index
                this.y = newY;
                this.x = newX;
                this.energy--;
            }
            if (weather === 'winter') {
                this.energy-=4
            }
            else {
                this.energy-=2
            }
        }
    }
    eat() {
        var newCell5 = random(this.chooseCell(5))
        var newCell3 = random(this.chooseCell(3))
        var newCell;
        var arr = []
        var cells = [newCell5, newCell3];
        for (var i in cells) {
            if (typeof cells[i] == "object") {
                newCell = arr.concat(cells[i])
            }
        }
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (weather === 'winter' && matrix[newY][newX] == 5) { 
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in dragonArr) {
                    if (newX ==  dragonArr[i].x && newY == dragonArr[i].y) {
                        dragonArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 30;
                spiderWork++
            }
            else if (matrix[newY][newX] == 3) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in herbivorouEaterArr) {
                    if (newX == herbivorouEaterArr[i].x && newY == herbivorouEaterArr[i].y) {
                        herbivorouEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 4 
                spiderWork++
            }
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 30 && newCell) {
            var newDragon = new Dragon(newCell[0], newCell[1], this.index);
            dragonArr.push(newDragon);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 18;
            dragonLength++
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 7 && newCell) {
            var newSpider = new Spider(newCell[0], newCell[1], this.index);
            spiderArr.push(newSpider);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 6;
            spiderLength++
        }
    }
    dead() {
        if (this.energy < 2) {
            matrix[this.y][this.x] = 0
            for (var i in spiderArr) {
                if (this.x == spiderArr[i].x && this.y == spiderArr[i].y) {
                    spiderArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}