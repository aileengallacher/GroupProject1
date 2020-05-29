const Random = require("../Common/Random");

module.exports = class ServiceCentre {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    }

    getinfo() {
        return `Service Centre : ${this.name}, number:  ${this.number}`;
    }

    static getRandomServiceCentre(number) {
        let array = [];
        let arraynumber = Random.getRandomNumber(number);

        for (let i = 0; i < arraynumber; i++) {
            let name = Random.getRANDOMcenter();
            if (array.find(e => e.name == name)) {
                i--;
            } else {
                let randomCentre = new ServiceCentre(name, Random.getRandomNumber(500) + 100);
                array.push(randomCentre);
            }

        }
        return array;
    }

}