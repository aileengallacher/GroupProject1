const fs = require("fs");
const Worker = require("../Models/Worker");

module.exports = class WorkerDataLayer {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getWorkerFile() {
        return JSON.parse(fs.readFileSync(this.fileName).toString()).map(w => new Worker(
            w.firstName,
            w.lastName,
            w.age,
            w.position,
            w.centreNumber,
            w.staffNumber
        ));
    }

    writeArrayIntoFile(worker) {
        fs.writeFileSync(this.fileName, JSON.stringify(worker));
    }

    addWorker(worker) {
        let workerArray = this.getWorkerFile();
        workerArray.push(worker);
        this.writeArrayIntoFile(workerArray);
        // this.writeArrayIntoFile(this.getArrayFromFile())  ** same function but using concat
    }

    deleteWorker(staffNumber) {
        this.writeArrayIntoFile(this.getWorkerFile().filter(w => w.staffNumber != staffNumber));
    }

    updateWorker(worker) {
        this.writeArrayIntoFile(this.getWorkerFile().map(w => {
           if (w.staffNumber == worker.staffNumber) {
            // if (w.centreNumber == worker.centreNumber) {
                return worker;
            } else {
                return w;
            }
        }));
    }

    searchWorkerByStaffNumber(staffNumber) {
        return this.getWorkerFile().find(w => w.staffNumber == staffNumber);
    }

    searchByName (name) {
        return this.getWorkerFile().filter(w => `${w.firstName} ${w.lastName}`.toLowerCase().includes(name));
    }

    // WARNING
    writeToFile(worker, serviceCentreNumber) {
        fs.writeFileSync(this.fileName, JSON.stringify(Worker.getRandomWorker(worker, serviceCentreNumber)));
    }
}