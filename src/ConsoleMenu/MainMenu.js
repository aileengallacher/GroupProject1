const { askQuestion } = require("../Common/AskQuestion");
const { ServiceCentreMenu } = require("../ConsoleMenu/ServiceCentreMenu");
const { WorkerMenu } = require("../ConsoleMenu/WorkerMenu");

async function mainMenu() {
    let shouldLoop = true;
    while (shouldLoop) {
        console.log("\t\t * * * * * * * * * * * * * * * * * * ");
        console.log("\t\t Welcome to the Service NSW Database \n");
        console.log("\t\t * * * * * * * * * * * * * * * * * * ");
        console.log("[1] Service Centre Menu");
        console.log("[2] Worker Menu");
        console.log("[3] Exit");
        let userInput = await askQuestion("Please select from the following options: ")
        switch (userInput) {
            case "1":
                await ServiceCentreMenu()
                break;
            case "2":
                await WorkerMenu()
                break;
            case "3":
                break;
            default:
                console.log("Please enter an option between 1 and 3.")
                break;

        }
    }
}
module.exports = {
    mainMenu
}

mainMenu().then(() => {
    process.exit(0)
})
