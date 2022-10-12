let configuration = null;

async function getConfig() {
    let setConfig = async () => {
        if (!configuration) {
            let response = await fetch("http://localhost:8080/client-config");
            configuration = await response.json();
            configuration.fieldDefaultColor = "#ff0000"
        }
    }
    await setConfig();
    return configuration;
}

let configurator = {
    getConfig,
};

export default configurator;
