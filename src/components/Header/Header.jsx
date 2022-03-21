import './header.scss'
import logo from '../../assets/logo.png'

function Header() {
    return (
        <div className="header">
            <div className="content">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Header;
