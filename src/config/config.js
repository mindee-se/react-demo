import configJson from "./config.json";

const fieldTypes = {
    "locale": {
        "default": {"value": ""}
    },
    "field": {
        "default": {"value": ""}
    },
    "[:field]": {
        "default": []
    },
    "lineItem": {
        "default": {"content": ""}
    },
    "[:lineItem]": {
        "default": []
    }
};

let configuration = null;

function getInitialFields() {
    let config = getConfig();
    let initial = {};
    for (const field in config["fields"]["definition"]) {
        const fieldType = config["fields"]["definition"][field]["type"];
        initial[field] = fieldTypes[fieldType]["default"];
    }
    return initial;
}

function getConfig() {
    if (configuration) {
        return configuration;
    }
    configuration = configJson;
    return configuration;
}

let configurator = {
    getInitialFields,
    getConfig,
};

export default configurator;
