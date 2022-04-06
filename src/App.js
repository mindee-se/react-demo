import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Drop from "./components/Drop/Drop";
import {useCallback, useEffect, useState, useRef} from "react";
import {drawLayer, drawShape, getImagesFromPDF, setShapeConfig} from "react-mindee-js";
import DocViewer from "./components/DocViewer/DocViewer";
import DataViewer from "./components/DataViewer/DataViewer";
import loaderGIF from "./assets/mindee-logo.gif";
import config from "./config/config";
let Config = config.getConfig();

function makeShapes(data) {
    let shapes = []
    for (const [key, fieldObj] of Object.entries(data)) {
        if (fieldObj.coordinates) {
            shapes.push({id: key, coordinates: fieldObj.coordinates})
        }
        if (Array.isArray(fieldObj)) {
            for (const [idx, line] of fieldObj.entries()) {
                if (line.coordinates) {
                    shapes.push({
                        id: `line-${idx}`,
                        coordinates: line.coordinates
                    })
                }
            }
        }
    }
    return [shapes];
}

function App() {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [documentData, setdocumentData] = useState(config.getInitialFields())
    const [shapes, setShapes] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [activeFeature, setActiveFeature] = useState("")

    const annotationViewerStageRef = useRef(null);
    const setAnnotationViewerStage = (stage) => {
        annotationViewerStageRef.current = stage;
    };
    const onFieldMouseEnter = (shapeId) => {
        drawShape(annotationViewerStageRef.current, shapeId, {
            fill: `#ff000040`
        });
    };
    const onFieldMouseLeave = (shapeId) => {
        setShapeConfig(annotationViewerStageRef.current, shapeId, {
            fill: 'rgba(0,51,255,0.22)'
        });
        drawLayer(annotationViewerStageRef.current);
    };

    useEffect(() => {
        document.title = Config.projectName + " Demo"
        // POST request using fetch inside useEffect React hook
        if (files.length > 0) {
            let data = new FormData()
            data.append('upload', files[0])
            const requestOptions = {
                method: 'POST',
                body: data
            };

            fetch(Config.uploadURL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setdocumentData(data)
                    setShapes(makeShapes(data))
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
            <Header/>
            {files.length === 0 && <Drop onDrop={onDrop}/>}
            {images.length > 0 && <>
                <div className={"p-3"}>
                    <div className="row">
                        <DocViewer
                            onShapeMouseEntered={onShapeMouseEntered}
                            images={images}
                            shapes={shapes}
                            onShapeMouseLeft={onShapeMouseLeft}
                            getStage={setAnnotationViewerStage}
                        />
                        {
                            loaded ? <DataViewer
                                activeFeature={activeFeature}
                                documentData={documentData}
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
