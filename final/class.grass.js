var LivingCreature = require('./general')
var random = require('./random')
module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0
    }
    mul() {
        if (weather === 'winter') {
            this.multiply+=1
        }
        else {
            this.multiply+=10
        }
        var newCell = random(super.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
            grassLength++
        }  
    }
}
