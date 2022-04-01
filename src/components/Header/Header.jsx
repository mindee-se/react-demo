import './header.scss'
import config from "../../config/config";
let Config = config.getConfig();

function Header() {
    return (
        <div className="header">
            <div className="content">
                {Config.logoURL ?
                    <div className="project">
                        <img src={Config.logoURL} alt=""/>
                    </div>
                    :
                    <div className="project">
                        <h3>{Config.projectName}</h3>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;
