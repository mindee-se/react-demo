import './dataViewer.scss'
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import loaderGIF from "../../assets/mindee-logo.gif"
import config from "../../config/config";
let Config = config.getConfig();

function renderField(key, fieldObj, activeFeature, onFieldMouseEnter, onFieldMouseLeave) {
    let fieldDef = Config.fields.definition[key];
    if (fieldDef.type === "field") {
        let hclass;
        if (fieldObj.value) {
            hclass = "form-group row field";
        } else {
            hclass = "form-group row empty-field";
        }
        return <div
                    id={key}
                    className={activeFeature === key ? `${hclass} active` : hclass}
                    onMouseEnter={() => onFieldMouseEnter(key)}
                    onMouseLeave={() => onFieldMouseLeave(key)}
        >
            <label className="col-sm-2 col-form-label">{fieldDef.name}</label>
            <div className="col-sm-10">
                <input type="text" className={"form-control form-control-sm"} value={fieldObj.value} />
            </div>
        </div>
    } else if (fieldDef.type === "[:field]") {
        return <div id={key} className="row">
            <b>{fieldDef.name}:</b>
            {fieldObj.map((obj, k) =>
                <li>
                    {obj.value}
                </li>
            )}
        </div>
    } else if (fieldDef.type === "locale") {
        return <div id={key} className={activeFeature === key ? "field active" : "field"}>
            <b>{fieldDef.name}:</b> {fieldObj.value} - {fieldObj.currency}
        </div>
    } else if (fieldDef.type === "[:lineItem]") {
        return <div className="line-items">
            {fieldDef.name ? <b>{fieldDef.name}:</b> : ""}
            {renderLineItems(fieldObj, fieldDef, activeFeature, onFieldMouseEnter, onFieldMouseLeave)}
        </div>
    }
}

function renderLineItems(lineItems, fieldDef, activeFeature, onFieldMouseEnter, onFieldMouseLeave) {
    return <Table className="lineItems mt-1" striped hover>
        <thead>
        <tr>
            {Object.values(fieldDef.columns).map((def) => (
                <th>{def.name}</th>
            ))}
        </tr>
        </thead>
        <tbody>
        {lineItems.map((obj, idx) =>
            <tr
                id={`line-${idx}`}
                className={activeFeature === `line-${idx}` ? "line-item active" : "line-item"}
                onMouseEnter={() => onFieldMouseEnter(`line-${idx}`)}
                onMouseLeave={() => onFieldMouseLeave(`line-${idx}`)}
            >
                {Object.keys(fieldDef.columns).map((key) => (
                    <td>{obj[key].value}</td>
                ))}
            </tr>
        )}
        </tbody>
    </Table>
}

function DataViewer({documentData, activeFeature, onFieldMouseEnter, onFieldMouseLeave}) {
    const [line_items, setline_items] = useState(documentData)
    useEffect(() => {
        setline_items(documentData)
    }, [documentData])
    return (
        <div className="col-md-7">
            {
                documentData ?
                    <div className="form-container pb-1">
                        {Object.entries(documentData).map(([key, fieldObj], idx) => (
                            renderField(key, fieldObj, activeFeature, onFieldMouseEnter, onFieldMouseLeave)
                        ))}
                    </div>
                    :
                    <div>
                        <img src={loaderGIF} alt="loading ..."/>
                    </div>
            }
        </div>
    );
}

export default DataViewer;
