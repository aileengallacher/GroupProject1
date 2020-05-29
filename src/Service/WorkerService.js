module.exports = class WorkerService {
    constructor(workerDataLayer, serviceCentreDataLayer) {
        this.workerDataLayer = workerDataLayer;
        this.serviceCentreDataLayer = serviceCentreDataLayer;
    }

    validWorker(centreNumber) {
        if (isNaN(centreNumber)) {
            return false;
        } else if (this.serviceCentreDataLayer.getCentreNumber().find(n => n == centreNumber)) {  //.getCentreNumber().find(n => n == centreNumber)) {
            return true;
        } else {
            return false;
        }
    }

    addWorker(newWorker) {
        if (!this.validWorker(newWorker.centreNumber)) {
            console.log("ERROR: This worker is not valid")
        }
        else {
            this.workerDataLayer.addWorker(newWorker);
        }
    }
    deleteWorker(staffNumber) {
        if (this.workerDataLayer.searchWorkerByStaffNumber(staffNumber)) {
            this.workerDataLayer.deleteWorker(staffNumber);
        } else {
            console.log("ERROR: This worker does not exist.")
        }
    }

    updateWorker(newWorker) {
        // if (this.workerDataLayer.searchWorkerByStaffNumber(newWorker.staffNumber) == undefined) {
        // // if (!this.validWorker(newWorker.centreNumber)) {
        //     console.log("ERROR: This worker does not exist.")
        // } else {
            this.workerDataLayer.updateWorker(newWorker);
        // }
    }

    searchByName(name) {
        let names = this.workerDataLayer.searchByName(name);
        if (names.length == 0) {
            console.log("No names found..");
        } else {
            return names;
        }
    }

    findWorkerCentre(workerCentreNumber) {
        let centre = this.serviceCentreDataLayer.getCentreNumber().find(c => c.number == workerCentreNumber);
        if (centre == undefined) {
            console.log("This worker does not belong to a centre.")
        } else {
            return centre;
        }


    }

}
