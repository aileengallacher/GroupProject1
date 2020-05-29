const path = require("path");
const { askQuestion } = require("../Common/AskQuestion");
const Worker = require("../Models/Worker");
const ServiceCentreDataLayer = require("../DataLayer/ServiceCentreDataLayer");
const ServiceCentreService = require("../Service/ServiceCentreService");
const WorkerDataLayer = require("../DataLayer/WorkerDataLayer");
const WorkerService = require("../Service/WorkerService")

let databasepath = path.join(__dirname, "../../", "JsonData");
let _serviceCentreDataLayer = new ServiceCentreDataLayer(path.join(databasepath, "ServiceCenter.json"));
let _workerDataLayer = new WorkerDataLayer(path.join(databasepath, "Worker.json"));
let _serviceCentreService = new ServiceCentreService(_serviceCentreDataLayer, _workerDataLayer);
let _workerService = new WorkerService(_workerDataLayer, _serviceCentreDataLayer);

async function addWorker() {
    let workerFirstName = await askQuestion("Enter the workers first name: ");
    let workerLastName = await askQuestion("Enter the workers last name: ");
    let workerAge = await askQuestion("Enter workers age: ");
    workerAge = parseInt(workerAge);
    let workerCentre = await askQuestion("Enter Service Centre number: ");
    workerCentre = parseInt(workerCentre);
    if (!_workerService.validWorker(workerCentre)) {
        console.log("ERROR: Service Centre number entered does not exist.")
    } else {
        let shouldLoop = true;
        while (shouldLoop) {
            console.log();                     // will choose position for new worker
            console.log("[1] Manager");
            console.log("[2] Coordinator");
            console.log("[3] Concierge");
            console.log("[4] CSR");
            console.log("[5] DSR");
            let userInput = await askQuestion("Enter workers position: ");
            switch (userInput) {
                case "1":             // can only be 1 manager per Service Centre
                    let newWorkerCentre = _serviceCentreService.showWorkersAtCentre(newWorkerCentre);
                    if (newWorkerCentre.find(w => w.position.toLowerCase().incldes("Manager"))) {
                        console.log("This Service Centre already has a manager");
                        break;
                    }
                    workerPosition = "Manager";
                    shouldLoop = false;
                    break;
                case "2":
                    workerPosition = "Coordinator";
                    shouldLoop = false;
                    break;
                case "3":
                    workerPosition = "Concierge";
                    shouldLoop = false;
                    break;
                case "4":
                    workerPosition = "CSR";
                    shouldLoop = false;
                    break;
                case "5":
                    workerPosition = "DSR";
                    shouldLoop = false;
                    break;
                default:
                    console.log("Please select an option between 1 and 5");
            }
        }
        let new_Worker = new Worker(workerFirstName, workerLastName, workerAge, workerPosition, workerCentre)
        _workerService.addWorker(new_Worker);
    }
}

async function searchForWorker() {
    let searchName = await askQuestion("Enter the workers name: ");
    searchName = searchName.toLowerCase();
    let foundWorker = _workerService.searchByName(searchName);
    let worker;
    if (foundWorker == undefined) {
        console.log("ERROR: No worker found ");
    } else if (foundWorker.length > 1) {
        console.log("There is more than worker found. \n")
        console.log(foundWorker);
        let age = await askQuestion("Enter the worker age you want to search: ");
        worker = foundWorker.filter(w => w.age == age);
        if (worker.length > 1 || worker == undefined) {
            console.log("Please search again with more details.")
        } else {
            worker = worker[0];
            if (worker == undefined) {
                console.log("ERROR: No worker found.");
            } else {
                console.log(`Search found: ${worker.getInfo()}`);
                return worker;
            }
        }
    } else {
        worker = foundWorker[0];
        console.log(`Search found: ${worker.getInfo()}`);
        return worker;
    }
}

async function deleteWorker(workerSelected) {
    if (workerSelected == undefined) {
        console.log("ERROR: Worker does not exist.")
    } else {
        _workerService.deleteWorker(workerSelected.staffNumber);
        console.log("Worker has been deleted.");
    }
}

async function updateWorker(worker) {
    if (worker == undefined) {
        console.log("ERROR: Worker does not exist.");
    } else {
        let newFirstname = await askQuestion("Enter new name: ");
        let newLastName = await askQuestion("Enter family name: ");
        let newPosition = await askQuestion("Enter position: ")
        worker.firstName = newFirstname;
        worker.lastName = newLastName;
        worker.position = newPosition;
        _workerService.updateWorker(worker);
        console.log("Worker details have been updated.");
    }
}


async function findCentre(worker) {

    let workerArray = _workerService.findWorkerCentre(worker.centre);
    if (workerArray == undefined) {
        console.log(workerArray);
    }
}

async function WorkerMenu() {
    let shouldLoop = true;
    let worker;
    while (shouldLoop) {
        console.log("\t\t WORKER MENU \n");
        console.log("[1] Add a new worker");
        console.log("[2] Search for a worker");
        console.log("[3] Delete a worker");
        console.log("[4] Update a worker");
        console.log("[5] Find workers Service Centre");
        console.log("[6] Back to Main Menu");
        let userInput = await askQuestion("Enter your selection: ");
        switch (userInput) {
            case "1":
                await addWorker()
                console.log("New worker has been added. ")
                break;
            case "2":
                await searchForWorker()
                break;
            case "3":
                worker = await searchForWorker();
                deleteWorker(worker);
                break;
            case "4":
                worker = await searchForWorker();
                await updateWorker(worker);
                break;
            case "5":
                worker = await searchForWorker();
                await findCentre(worker);
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
    WorkerMenu
}

