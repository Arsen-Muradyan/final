var LivingCreature = require('./general')
var random = require('./random')

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
       super(x, y, index)
       this.energy = 5
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index
            this.y = newY;
            this.x = newX;
            this.energy--;
        }
    }
    eat() {
        var newCell = random(this.chooseCell(1))
        if (typeof newCell === 'object') {
            var newX = newCell[0];
            var newY = newCell[1];
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
            if (weather === 'winter') {
                this.energy += 2;
            }else {
                this.energy += 8;
            }
            grassEaterWork++
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 2 && newCell && weather === 'winter') {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
            grassEaterLength++
        }
    }
    dead() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}