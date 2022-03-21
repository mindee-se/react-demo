import './drop.scss'
import placeholder from "../../assets/placeholder.svg";
import {useDropzone} from "react-dropzone";

function Drop({onDrop}) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className="area-dropzone">
            <input {...getInputProps()} />
            <div className="content-dropzone">
                {
                    isDragActive ?
                        <p>
                        </p> :
                        <p>
                            <img src={placeholder} alt=""/> <br/><br/>
                            Upload an invoice.
                        </p>
                }
            </div>
        </div>
    );
}

export default Drop;
