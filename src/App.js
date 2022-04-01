import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Drop from "./components/Drop/Drop";
import {useCallback, useEffect, useState} from "react";
import {getImagesFromPDF} from "react-mindee-js";
import DocViewer from "./components/DocViewer/DocViewer";
import DataViewer from "./components/DataViewer/DataViewer";
import loaderGIF from "./assets/mindee-logo.gif";
import config from "./config/config";
let Config = config.getConfig();

function App() {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [invoiceData, setInvoiceData] = useState(config.getInitialFields())
    const [shapes, setShapes] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [activeFeature, setActiveFeature] = useState("")

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
                    console.log(data)
                    setInvoiceData(data)
                    setShapes(
                        [
                            data.line_items
                        ],
                    )
                    setLoaded(true)
                });
        }
    }, [files]);
    const onDrop = useCallback(acceptedFiles => {
        let urlFile = URL.createObjectURL(acceptedFiles[0])
        getImagesFromPDF(urlFile).then((_images) => {
            setImages(_images)
        })
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
                        />
                        {
                            loaded ? <DataViewer
                                activeFeature={activeFeature}
                                invoiceData={invoiceData}
                            />
                                :
                                <div
                                    style={{
                                        position: "relative"
                                    }}
                                    className="col-md-8 text-center">
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
