import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header";
import Drop from "./components/Drop/Drop";
import {useCallback, useEffect, useState} from "react";
import {getImagesFromPDF} from "react-mindee-js";
import Viewer from "./components/Viewer/Viewer";
import Form from "./components/Form/Form";
import loaderGIF from "./assets/mindee-logo.gif";

function App() {
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])
    const [invoiceData, setInvoiceData] = useState({
        locale: {value: ""},
        total_incl: {value: ""},
        total_excl: {value: ""},
        invoice_date: {value: ""},
        invoice_number: {value: ""},
        due_date: {value: ""},
        taxes: [],
        supplier: {value: ""},
        supplier_address: {value: ""},
        customer_name: {value: ""},
        customer_company_registration: {value: ""},
        customer_address: {value: ""},
        payment_details: [],
        company_number: [],
        total_tax: {value: ""},
        line_items: [],
    })
    const [shapes, setShapes] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [activeFeature, setActiveFeature] = useState("")

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        if (files.length > 0) {
            let data = new FormData()
            data.append('upload', files[0])
            const requestOptions = {
                method: 'POST',
                body: data
            };

            fetch('http://localhost:8080/parse-doc', requestOptions)
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
                        <Viewer
                            onShapeMouseEntered={onShapeMouseEntered}
                            images={images}
                            shapes={shapes}
                            onShapeMouseLeft={onShapeMouseLeft}
                        />
                        {
                            loaded ? <Form
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
