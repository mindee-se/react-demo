import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Drop from "./components/Drop/Drop";
import {useCallback, useEffect, useState, useRef} from "react";
import {drawLayer, drawShape, getImagesFromPDF, setShapeConfig} from "react-mindee-js";
import DocViewer from "./components/DocViewer/DocViewer";
import DataViewer from "./components/DataViewer/DataViewer";
import loaderGIF from "./assets/mindee-logo.gif";

function makeShapes(data, modelConfig) {
    let shapes = []
    for (const [key, fieldObj] of Object.entries(data)) {

        if(fieldObj == null) {
            continue;
        }

        let currentFieldColor = modelConfig.fieldDefaultColor;

        let currentFieldConfig = null;
        if(modelConfig.fields.hasOwnProperty(key)){
            currentFieldConfig = modelConfig.fields[key];

            if(currentFieldConfig.color !== undefined
            && currentFieldConfig.color !== null
            && currentFieldConfig.color !== "") {
                currentFieldColor = currentFieldConfig.color;
            }
        }

        if (fieldObj.coordinates) {
            shapes.push({id: key, coordinates: fieldObj.coordinates, config: {opacity: 0.5, stroke: currentFieldColor} })
        } else if (fieldObj.bbox) {
            shapes.push({id: key, coordinates: fieldObj.bbox, config: {opacity: 0.5, stroke: currentFieldColor}})
        }
        if (Array.isArray(fieldObj)) {
            for (const [idx, line] of fieldObj.entries()) {
                let shapeId = `${key}-line-${idx}`;
                if (line.coordinates) {
                    shapes.push({
                        id: shapeId,
                        coordinates: line.coordinates,
                        config: { opacity: 0.5, stroke: currentFieldColor }
                    })
                } else if (line.bbox) {
                    shapes.push({
                        id: shapeId,
                        coordinates: line.bbox,
                        config: { opacity: 0.5, stroke: currentFieldColor }
                    })
                }
            }
        }
    }
    return [shapes];
}

function App({config}) {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [documentData, setdocumentData] = useState({})
    const [shapes, setShapes] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [activeFeature, setActiveFeature] = useState("")

    const annotationViewerStageRef = useRef(null);
    const setAnnotationViewerStage = (stage) => {
        annotationViewerStageRef.current = stage;
    };

    const onFieldMouseEnter = (shapeId) => {
        let currentFieldColor = config.fieldDefaultColor;

        let currentFieldConfig = null;

        if(config.fields.hasOwnProperty(shapeId)){
            currentFieldConfig = config.fields[shapeId];
        }
        else {
            for(var field in config.fields) {
                if(shapeId.startsWith(field)){
                    currentFieldConfig = config.fields[field];
                    break;
                }
            }
        }

        if(currentFieldConfig !== undefined
            && currentFieldConfig.color !== undefined
            && currentFieldConfig.color !== null
            && currentFieldConfig.color !== "") {
                currentFieldColor = currentFieldConfig.color;
            }

            drawShape(annotationViewerStageRef.current, shapeId, {
                fill: currentFieldColor,
                opacity: 0.5
            });

            document.getElementById(shapeId).style.background = currentFieldColor;
            document.getElementById(shapeId).style.opacity = 0.5;
    };

    const onFieldMouseLeave = (shapeId) => {
        setShapeConfig(annotationViewerStageRef.current, shapeId, {
            fill: '',
        });
        drawLayer(annotationViewerStageRef.current);
        document.getElementById(shapeId).style.background = '';
        document.getElementById(shapeId).style.opacity = 1;
    };

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        if (files.length > 0) {
            let data = new FormData()
            data.append('upload', files[0])
            const requestOptions = {
                method: 'POST',
                body: data
            };

            fetch("http://localhost:8080/parse-doc", requestOptions)
                .then(response => response.json())
                .then(data => {
                    setdocumentData(data)
                    setShapes(makeShapes(data, config))
                    setLoaded(true)
                });
        }
    }, [files]);

    const onDrop = useCallback(acceptedFiles => {
        let file = acceptedFiles[0]
        let urlFile = URL.createObjectURL(file)
        if (file.type === "application/pdf") {
            getImagesFromPDF(urlFile).then((_images) => {
                setImages(_images)
            });
        } else {
            setImages([urlFile])
        }
        setFiles(acceptedFiles)
    }, [])

    const onShapeMouseEntered = (shape) => {
        setActiveFeature(shape.id)
    }
    const onShapeMouseLeft = () => {
        setActiveFeature("")
    }

    return (
        <div className="App">
            <Header config={config}/>
            {files.length === 0 && <Drop onDrop={onDrop} config={config}/>}
            {images.length > 0 && <>
                <div id={"main-content"} className={"p-3"}>
                    <div className="row">
                        <DocViewer
                            onShapeMouseEntered={onShapeMouseEntered}
                            images={images}
                            shapes={shapes}
                            onShapeMouseLeft={onShapeMouseLeft}
                            getStage={setAnnotationViewerStage}
                            fieldDefaultColor={config.fieldDefaultColor}
                        />
                        {
                            loaded ? <DataViewer
                                documentData={documentData}
                                activeFeature={activeFeature}
                                config={config}
                                onFieldMouseEnter={onFieldMouseEnter}
                                onFieldMouseLeave={onFieldMouseLeave}
                            />
                                :
                                <div
                                    style={{
                                        position: "relative"
                                    }}
                                    className="col-md-6 text-center">
                                    <img
                                        style={{
                                            transform: "translateY(-50%)",
                                            top: "50%",
                                            position: "absolute"
                                        }}
                                        src={loaderGIF} alt=""/>
                                </div>
                        }
                    </div>
                </div>
            </>}
        </div>
    );
}

export default App;
