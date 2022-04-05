import './drop.scss'
import placeholder from "../../assets/placeholder.svg";
import {useDropzone} from "react-dropzone";

function Drop({onDrop, config}) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className="area-dropzone">
            <input {...getInputProps()} />
            <div className="content-dropzone">
                {
                    isDragActive ?
                        <p>
                        </p> :
                        <div>
                            <p><img src={placeholder} alt=""/></p>
                            <p>Upload a document of type: <b>{config.documentName}</b></p>
                            <p>File can be image or PDF</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default Drop;
