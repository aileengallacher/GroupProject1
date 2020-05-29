const path = require("path");
const { askQuestion } = require("../Common/AskQuestion");
const ServiceCentre = require("../Models/ServiceCentre");
const ServiceCentreDataLayer = require("../DataLayer/ServiceCentreDataLayer");
const ServiceCentreService = require("../Service/ServiceCentreService");
const WorkerDataLayer = require("../DataLayer/WorkerDataLayer");

let databasepath = path.join(__dirname, "../../", "JsonData");
let _serviceCentreDataLayer = new ServiceCentreDataLayer(path.join(databasepath, "ServiceCenter.json"));
let _workerDataLayer = new WorkerDataLayer(path.join(databasepath, "Worker.json"));
let _serviceCentreService = new ServiceCentreService(_serviceCentreDataLayer, _workerDataLayer);

async function addServiceCentre(newName) {
    let serviceCentreName = await askQuestion("Enter new Service Centre name (location): ");
    let serviceCentreNumber = await askQuestion("Enter Service Centre number: ");
    serviceCentreNumber = parseInt(serviceCentreNumber);
    let serviceCentre = new ServiceCentre(serviceCentreName, serviceCentreNumber);
    _serviceCentreService.addServiceCentre(serviceCentre);
}

async function searchByName() {
    let inputName = await askQuestion("Enter Service Centre name to search: ");
    inputName = inputName.toLowerCase();
    let serviceCentreNames = _serviceCentreService.searchByName(inputName);
    let selectedServiceCentre;
    if (serviceCentreNames == undefined) {
        console.log("ERROR: No Service Centre found.");
    } else if (serviceCentreNames.length > 1) {
        console.log(serviceCentreNames);
        let number = await askQuestion("Enter the Service Centre number: ");
        selectedServiceCentre = serviceCentreNames.find(n => n.number == number);
        console.log(selectedServiceCentre);
        return selectedServiceCentre;
    } else {
        selectedServiceCentre = serviceCentreNames[0];
        console.log(selectedServiceCentre);
        return selectedServiceCentre;
    }
}

async function deleteServiceCentre(centreName) {
    _serviceCentreService.deleteServiceCentre(centreName.number);
}

async function ServiceCentreMenu() {
    let shouldLoop = true;
    let selectedCentre;
    while (shouldLoop) {
        console.log("\t\t SERVICE CENTRE MENU \n");
        console.log("[1] Add a Service Centre");
        console.log("[2] Search for a Service Centre");
        console.log("[3] Delete a Service Centre");
        console.log("[4] Update a Service Centre");
        console.log("[5] Show all workers in a given Centre Centre");
        console.log("[6] Back to Main Menu");
        let userInput = await askQuestion("Enter your selection: ");
        switch (userInput) {
            case "1":
                await addServiceCentre();
                break;
            case "2":
                await searchByName();
                break;
            case "3":
                selectedCentre = await searchByName();
                if (selectedCentre == undefined) {
                    break;
                }
                await deleteServiceCentre(selectedCentre);
                break;
            case "4":
                selectedCentre = await searchByName();
                if (selectedCentre == undefined) {
                    break;
                }
                let newServiceCentreName = await askQuestion("Enter new centre name: ");
                selectedCentre.name = newServiceCentreName;
                _serviceCentreService.updateServiceCentre(selectedCentre);
                console.log(`Service Centre name has now been updated to ${newServiceCentreName}\n`);
                break;
            case "5":
                selectedCentre = await searchByName();
                if (selectedCentre == undefined) {
                    break;
                }
                console.log(_serviceCentreService.showWorkersAtCentre(selectedCentre.number));
                break;
            case "6":
                shouldLoop = false;
                break;
            default:
                console.log("Please enter an option between 1 and 6.");
                break;

        }
    }

}

module.exports = {
    ServiceCentreMenu
}

