let CardDataProcess = require('../obj/src/container/CardDataProcess').CardDataProcess;

try {
    let proc = new CardDataProcess();
    proc._configPath = "./config/config.yml";
    proc.run(process.argv);
} catch (ex) {
    console.error(ex);
}
