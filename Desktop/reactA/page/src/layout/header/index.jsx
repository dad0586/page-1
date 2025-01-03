import { Link } from "react-router-dom";
import Icon from "../../assets/icon";
import Search2 from "../../components/search";
import "./main.scss"

const Header = () => {
    return (
        <>
            <div className="container">
                <div className="header">
                    <div>
                        <Link to="/">
                            <Icon />
                        </Link>
                    </div>
                    <div className="header__link">
                        <Link to="/"> Home </Link>
                        <Link to="/category">Category</Link>
                    </div>
                    <div>
                        <Search2 />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header;