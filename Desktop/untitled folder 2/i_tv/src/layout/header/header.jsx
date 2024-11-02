import { Link } from "react-router-dom";
import Logo from "../../assets/icon/logo";
import "../header/main.scss"
import Search from "../../components/search/search";

const Header = () => {
    return (
        <>
            <div className='container'>
                <div className="navbar">
                    <div className="navbar_logo">
                        <Link to="/"> <Logo /> </Link>
                    </div>
                    <div className="navbar_links">
                        <Link to="/"> Bosh sahifa </Link>
                        <Link to="/tv"> TV </Link>
                        <Link to="/filmlar"> Filmlar </Link>
                        <Link to="/seriallar"> Seriallar </Link>
                        <Link to="/multfilmlar"> Multfilmlar </Link>
                        <Link to="/anime"> Anime </Link>
                        <Link to="/obunalar"> Obunalar </Link>
                        <Link to="/boshqalar"> Boshqalar </Link>
                    </div>
                    <div className="navbar_search">
                        <Search/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;