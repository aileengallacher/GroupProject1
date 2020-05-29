//const = require()

module.exports = class ServiceCentreService {
    constructor(serviceCentreDataLayer, workerDataLayer) {
        this.servicecentreDataLayer = serviceCentreDataLayer;
        this.workerDataLayer = workerDataLayer;
    }

    addServiceCentre(serviceCentreToAdd) {
        let serviceCentre = this.servicecentreDataLayer.searchByNumber(serviceCentreToAdd.number); // searches the json file for the service centre number inputted
        if (serviceCentre) {    // if the value is found, serviceCentre will be 'true' so will error as already exists
            console.log("ERROR: Service Centre already exists.");
        } else if (!this.validCentre(serviceCentreToAdd)) {              //  will run through validCentre below to check the format of centre is correct 
            console.log("The centre number entered is not valid.")
        } else {
            this.servicecentreDataLayer.addServiceCentre(serviceCentreToAdd);  // will add new service centre
            console.log("Service Centre has been added.")
        }
    }

    validCentre(serviceCentreNumber) {                                 // restricts the userInput for service centre number to be between 100-600
        if (serviceCentreNumber.number > 100 && serviceCentreNumber.number < 600) {
            return true;
        } else {
            return false;
        }
    }

    deleteServiceCentre(serviceCentreNumber) {
        this.servicecentreDataLayer.deleteServiceCentre(serviceCentreNumber);
    }

    updateServiceCentre(serviceCentreToUpdate) {
        let serviceCentre = this.servicecentreDataLayer.searchByNumber(serviceCentreToUpdate.number)
        if (serviceCentre) {
            this.servicecentreDataLayer.updateServiceCentre(serviceCentreToUpdate);
        } else {
            console.log("Service Centre does not exist");
        }
    }
    searchByName(serviceCentre) {
        let serviceCentreArray = this.servicecentreDataLayer.searchByName(serviceCentre);
        if (serviceCentreArray.length == 0) {
            console.log("No matching Service Centre for your search ");
        } else {
            return serviceCentreArray;
        }
    }
    showWorkersAtCentre(centreNumber) {
        let workers = this.workerDataLayer.getWorkerFile();
        let workerAtCentre = workers.filter(w => w.centreNumber == centreNumber);
        if (workerAtCentre) {
            return workerAtCentre;
        } else {
            console.log("No workers at this centre");
        }
    }
}