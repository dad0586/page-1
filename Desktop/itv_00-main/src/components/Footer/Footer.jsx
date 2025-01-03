import React from "react";
import "../Footer/Footer.scss";
import "../../styles/general.scss";
import logo from "../../assets/icons/itv.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="left container">
          <div className="logo-image">
            <img src={logo} alt="Logo" />
          </div>
          <div className="tf">
            
            <p>
              ITv - Free movies online, here you can watch movies online in
              high quality for free without annoying of advertising, just come
              and enjoy your movies online. fmovie, fmovies, bmovies
            </p>
            <p>
              Disclaimer: This site does not store any files on its server. All
              contents are provided by non-affiliated third parties.
            </p>
          </div>
        </div>

        <div className="middle">
          <div className="link">
            <span>MOVIES</span>
            <h5>
              <Link to="/genre/28">Action</Link>
            </h5>
            <h5>
              <Link to="/genre/12">Adventure</Link>
            </h5>
            <h5>
              <Link to="/genre/80">Crime</Link>
            </h5>
            <h5>
              <Link to="/genre/35">Comedy</Link>
            </h5>
            <h5>
              <Link to="/genre/18">Drama</Link>
            </h5>
          </div>
          <div className="link">
            <span>COUNTRY</span>
            <h5>
              <Link to="/country/USA">United States</Link>
            </h5>
            <h5>
              <Link to="/country/CAN">Canada</Link>
            </h5>
            <h5>
              <Link to="/country/GBR">United Kingdom</Link>
            </h5>
            <h5>
              <Link to="/country/AUS">Australia</Link>
            </h5>
            <h5>
              <Link to="/country/NZL">New Zealand</Link>
            </h5>
          </div>

          <div className="link">
            <span>FREE MOVIES</span>
            <Link to="/movies">
              <h5>Movies</h5>
            </Link>
            <Link to="/tvseries">
              <h5>TV-series</h5>
            </Link>
            <Link to="/imdb">
              <h5>Top IMDb</h5>
            </Link>
          </div>
          <div className="link">
            <span>HELP</span>
            <h5>FAQ's</h5>
            <h5>DMCA</h5>
          </div>
        </div>
      </div>

      <div className="copyright">
        <span>© 2024 ITv. All rights reserved.</span>
      </div>
    </>
  );
}

export default Footer;
