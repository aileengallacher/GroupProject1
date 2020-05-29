const Random = require("../Common/Random");
const { v4 } = require("uuid");

module.exports = class Worker {    // this is all the properties that will make up a "Worker" object
    constructor(firstName, lastName, age, position, centreNumber, staffNumber = v4()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.position = position;
        this.centreNumber = centreNumber;
        this.staffNumber = staffNumber;
    }
    getInfo() {
        return `Worker : ${this.firstName} ${this.lastName} ${this.age} ${this.position} ${this.centreNumber} ${this.staffNumber}`;

    }
    static getRandomWorker(number, centreNumber) {
        let array = []
        for (let j = 0; j < centreNumber.length; j++) {
            array.push(new Worker(Random.getRandomGivenName(), Random.getRandomFamilyName(), Random.getRandomNumber(50) + 18, "Manager", centreNumber[j]));
            let arrayNumber = Random.getRandomNumber(number);     
            for (let i = 0; i < arrayNumber; i++) {
                let position = Random.getPosition();
                let worker = new Worker(
                    Random.getRandomGivenName(),
                    Random.getRandomFamilyName(),
                    Random.getRandomNumber(50) + 18,
                    position,
                    centreNumber[j]
                )
                array.push(worker);
            }
        }
        return array;
    }
}