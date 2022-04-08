import './drop.scss'
import placeholder from "../../assets/placeholder.svg";
import {useDropzone} from "react-dropzone";
import config from "../../config/config";
let Config = config.getConfig();

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
                            Upload a file of type: {Config.documentName}
                        </p>
                }
            </div>
        </div>
    );
}

export default Drop;
