const fs = require("fs");
const ServiceCentre = require("../Models/ServiceCentre");

module.exports = class ServiceCentreDataLayer {
    constructor(fileName) {
        this.fileName = fileName;
    }
    // retrieves the objects in ServiceCentre.json file and returns as an array using the elements of the Service Centre class
    getServiceCentreFile() {
        return JSON.parse(fs.readFileSync(this.fileName).toString()).map(e => new ServiceCentre(
            e.name,
            e.number
        ));
    }
    // this writes the contents of the class Service Centre into the ServiceCentre.json file
    writeArrayIntoFile(serviceCentre) {
        fs.writeFileSync(this.fileName, JSON.stringify(serviceCentre));
    }

    searchByNumber(centreNumber) {
        return this.getServiceCentreFile().find(c => c.number == centreNumber);
    }

    // t
    addServiceCentre(serviceCentre) {
        let serviceCentreArray = this.getServiceCentreFile();
        serviceCentreArray.push(serviceCentre);
        this.writeArrayIntoFile(serviceCentreArray);
    }
    // this 
    deleteServiceCentre(serviceCentreNumber) {
        this.writeArrayIntoFile(this.getServiceCentreFile().filter(c => c.number != serviceCentreNumber));
    }
    // this
    updateServiceCentre(serviceCentre) {
        this.writeArrayIntoFile(this.getServiceCentreFile().map(s => {
            if (s.number == serviceCentre.number) {
                return serviceCentre;
            } else {
                return s;
            }
        }));
    }
    searchByName(serviceCentreName) {
        return this.getServiceCentreFile().filter(s => s.name.toLowerCase().includes(serviceCentreName));

    }
    getCentreNumber() {
        return this.getServiceCentreFile().map(c => c.number);
    }

    // WARNING
    writeToFile(number) {
        fs.writeFileSync(this.fileName, JSON.stringify(ServiceCentre.getRandomServiceCentre(number)));
    }
}