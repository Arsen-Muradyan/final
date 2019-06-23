var LivingCreature = require('./general')
var random = require('./random')
var Grass = require('./class.grass')
module.exports = class Dragon extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 18;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {
        var newCell = random(this.chooseCell(0))
        if (typeof newCell !== "undefined") {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy-=3;
        }
    }
    eat() {
        var newCell4 = random(this.chooseCell(4))
        var newCell3 = random(this.chooseCell(3))
        var newCell2 = random(this.chooseCell(2))
        var newCell1 = random(this.chooseCell(1))
        var newCell;
        var arr = []
        var cells = [newCell4, newCell3, newCell2, newCell1];
        for (var i in cells) {
            if (typeof cells[i] == "object") {
                newCell = arr.concat(cells[i])
            }
        }
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (weather !== 'winter') {
                if (matrix[newY][newX] == 4) {
                    matrix[this.y][this.x] = 0;
                    matrix[newY][newX] = this.index;
                    for (var i in spiderArr) {
                        if (newX ==  spiderArr[i].x && newY == spiderArr[i].y) {
                            spiderArr.splice(i, 1);
                            break;
                        }
                    }
                    this.y = newY;
                    this.x = newX;
                    this.energy += 6;
                    dragonWork.spider++
                }
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
                dragonWork.predator++
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
                this.energy += 3 
                dragonWork.grassEater++
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
                this.energy++
                dragonWork.grass++
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
    dead() {
        if (this.energy <= 16) {
            matrix[this.y][this.x] = 1
            var newgrass = new Grass(this.x, this.y, 1) 
            grassArr.push(newgrass) 
            grassLength++
            for (var i in dragonArr) {
                if (this.x == dragonArr[i].x && this.y == dragonArr[i].y) {
                    dragonArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
