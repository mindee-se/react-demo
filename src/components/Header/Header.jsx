import './header.scss'

function Header({config}) {
    function getTitle() {
        return config.customerName + " - " + config.projectName
    }
    document.title = getTitle();

    return (
        <div className="header">
            <div className="content">
                {config.logoURL ?
                    <div className="project">
                        <img src={config.logoURL} alt=""/>
                    </div>
                    :
                    <div className="project">
                        <h3>{getTitle()}</h3>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;
