import './dataViewer.scss'
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import loaderGIF from "../../assets/mindee-logo.gif"
import config from "../../config/config";
let Config = config.getConfig();

function renderField(key, fieldObj, activeFeature) {
    let fieldDef = Config.fields.definition[key];
    if (fieldDef.type === "field") {
        return <div className="docField">
            <b>{fieldDef.name}:</b> {fieldObj.value ? fieldObj.value : <em>none</em>}
        </div>
    } else if (fieldDef.type === "[:field]") {
        return <div className="row">
            <b>{fieldDef.name}:</b>
            {fieldObj.map((obj, k) =>
                <li>
                    {obj.value}
                </li>
            )}
        </div>
    } else if (fieldDef.type === "locale") {
        return <div className="docField">
            <b>{fieldDef.name}:</b> {fieldObj.value} - {fieldObj.currency}
        </div>
    } else if (fieldDef.type === "[:lineItem]") {
        return <div>
            {fieldDef.name ? <b>{fieldDef.name}:</b> : ""}
            {renderLineItems(fieldObj, fieldDef, activeFeature)}
        </div>
    }
}

function renderLineItems(line_items, fieldDef, activeFeature) {
    return <Table className="lineItems mt-1" striped bordered hover>
        <thead>
        <tr>
            {Object.values(fieldDef.columns).map((def) => (
                <th>{def.name}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {line_items.map((obj, k) =>
            <tr className={activeFeature === k ? "active-feature" : ""}>
                {Object.keys(fieldDef.columns).map((key) => (
                    <td>{obj[key].value}</td>
                ))}
            </tr>
        )}
        </tbody>
    </Table>
}

function DataViewer({documentData, activeFeature}) {
    const [line_items, setline_items] = useState(documentData)
    useEffect(() => {
        setline_items(documentData)
    }, [documentData])
    return (
        <div className="col-md-8">
            {
                documentData ?
                    <div className="form-container pb-1">
                        {Object.entries(documentData).map(([key, fieldObj], idx) => (
                            renderField(key, fieldObj, activeFeature)
                        ))}
                    </div>
                    :
                    <div>
                        <img src={loaderGIF} alt=""/>
                    </div>
            }
        </div>
    );
}

export default DataViewer;
