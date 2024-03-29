import './dataViewer.scss'
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import loaderGIF from "../../assets/mindee-logo.gif"

function renderField(key, fieldObj, activeFeature, fieldDef, onFieldMouseEnter, onFieldMouseLeave) {
    if (fieldObj === null) {
        return;
    }

    if (fieldDef.type === "field") {
        let hClass = "form-group row field";
        if (fieldObj.value === "") {
            hClass += "-empty";
        }
        return <div
                    id={key}
                    className={activeFeature === key ? `${hClass} active` : hClass}
                    onMouseEnter={() => onFieldMouseEnter(key)}
                    onMouseLeave={() => onFieldMouseLeave(key)}
        >
            <label className="col-sm-2 col-form-label">{fieldDef.name}</label>
            <div className="col-sm-10">
                <input type="text" className={"form-control form-control-sm"} value={fieldObj.value} />
            </div>
        </div>
    } else if (fieldDef.type === "[:field]") {
        return <div id={key} className="form-group row">
            <label className="col-sm-2 col-form-label">{fieldDef.name}</label>
            {fieldObj.map((obj, k) =>
                <li>
                    {obj.value}
                </li>
            )}
        </div>
    } else if (fieldDef.type === "locale") {
        return <div id={key}>
            <b>{fieldDef.name}:</b> {fieldObj.value} - {fieldObj.currency}
        </div>
    } else if (fieldDef.type === "[:lineItem]") {
        return <div className="line-items">
            {fieldDef.name ? <b>{fieldDef.name}:</b> : ""}
            {renderLineItems(fieldObj, key, fieldDef, activeFeature, onFieldMouseEnter, onFieldMouseLeave)}
        </div>
    }
}

function renderLineItems(lineItems, key, fieldDef, activeFeature, onFieldMouseEnter, onFieldMouseLeave) {

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
                id={`${key}-line-${idx}`}
                className={activeFeature === `line-${idx}` ? "line-item active" : "line-item"}
                onMouseEnter={() => onFieldMouseEnter(`${key}-line-${idx}`)}
                onMouseLeave={() => onFieldMouseLeave(`${key}-line-${idx}`)}
            >
                {Object.keys(fieldDef.columns).map(function(key) {
                    return <td>{obj[key].value}</td>
                })}
            </tr>
        )}
        </tbody>
    </Table>
}

function DataViewer({documentData, activeFeature, config, onFieldMouseEnter, onFieldMouseLeave}) {
    const [line_items, setline_items] = useState(documentData)
    useEffect(() => {
        setline_items(documentData)
    }, [documentData])
    return (
        <div className="col-md-7">
            {
                documentData ?
                    <div className="form-container pb-1">
                        {Object.entries(documentData).map( function([key, fieldObj], idx) {
                            const fieldDef = config.fields[key];
                            return renderField(
                                key, fieldObj, activeFeature, fieldDef, onFieldMouseEnter, onFieldMouseLeave
                            );
                        })}
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
