//import configJson from "./config.json";

let configuration = null;

async function getConfig() {
    let setConfig = async () => {
        if (!configuration) {
            let response = await fetch("http://localhost:8080/client-config");
            configuration = await response.json();
        }
    }
    await setConfig();
    return configuration;
}

let configurator = {
    getConfig,
};

export default configurator;
