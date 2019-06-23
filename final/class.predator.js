var LivingCreature = require('./general')
var random = require('./random')

module.exports = class  HerbivorouEater extends LivingCreature {
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
        var newCell = random(this.chooseCell(2))
            if (typeof newCell == 'object') {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
                for (var i in herbivorouEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy++;
                predatorWork++
            }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 6  &&  newCell) {
            var newHerbivorousEater = new HerbivorouEater(newCell[0], newCell[1], this.index);
            herbivorouEaterArr.push(newHerbivorousEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
            predatorLength++
        }
    }
    dead() {
        if (this.energy < 3) {
            matrix[this.y][this.x] = 0
            for (var i in herbivorouEaterArr) {
                if (this.x == herbivorouEaterArr[i].x && this.y == herbivorouEaterArr[i].y) {
                    herbivorouEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}