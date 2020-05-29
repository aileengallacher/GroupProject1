const ServiceCentre = require("./Models/ServiceCentre");
const path = require("path");

// console.log(ServiceCenter.getRandomServiceCenter(5));
const Worker = require("./Models/Worker");

//console.log(Worker.getRandomWorker(10));

const WorkerDataLayer = require("./DataLayer/WorkerDataLayer");
const ServiceCentreDataLayer = require("./DataLayer/ServiceCentreDataLayer");

let databasepath = path.join(__dirname,"../","JSONData");

// this generates service centres
_serviceCentreDataLayer = new ServiceCentreDataLayer(path.join(databasepath,"ServiceCenter.json"));
_serviceCentreDataLayer.writeToFile(8);

// this generates workers
_workerDataLayer = new WorkerDataLayer(path.join(databasepath,"Worker.json"));

// this assigns centre number to workers
let centreNumber = _serviceCentreDataLayer.getCentreNumber();
_workerDataLayer.writeToFile(10,centreNumber);