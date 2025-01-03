import Navbar from "./components/Navbar/Navbar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Genres from "./pages/Genres/Genres";
import Country from "./pages/Country/Country";
import Movies from "./pages/Movies/Movies";
import TvSeries from "./pages/TV-Series/TvSeries";
import IMDb from "./pages/Top IMDb/IMDb";
import Zeropage from "./pages/zeropage/zeropage";
import Footer from "./components/Footer/Footer";
import MovieInner from "./pages/MovieInner/MovieInner";
import GenreInner from "./pages/GenreInner/GenreInner";
import CountryInner from "./pages/CountryInner/CountryInner";
import SearchResults from "./pages/Search/SearchResults";
import ActorMovies from "./pages/ActorMovies/ActorMovies";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Zeropage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/home" element={<Home />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genre/:id" element={<GenreInner />} />
          <Route path="/country" element={<Country />} />
          <Route path="/country/:id" element={<CountryInner />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInner />} />
          <Route path="/actor/:actorId/movies" element={<ActorMovies />} />
          <Route path="/tvseries" element={<TvSeries />} />
          <Route path="/imdb" element={<IMDb />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
