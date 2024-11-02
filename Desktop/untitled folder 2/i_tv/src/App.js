import { Route, Router, Routes } from "react-router-dom";
import "./assets/style/main.scss"
import Header from "./layout/header/header";

import Bosh_sahifa from "./pages/boshsahifa/index"
import Filmlar from "./pages/filmlar/index"
import Seriallar from "./pages/seriallar/serial"
import Multfilmlar from "./pages/multfilmlar/index"
import Anime from "./pages/anime/index"
import Obunalar from "./pages/radio/index"
import Boshqalar from "./pages/boshqalar/index"
import TV from "./pages/tv";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Bosh_sahifa/>} />
        <Route path="/tv" element={<TV/>} />

        <Route path="/filmlar" element={<Filmlar />} />
        <Route path="/seriallar" element={<Seriallar />} />
        <Route path="/multfilmlar" element={<Multfilmlar />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/obunalar" element={<Obunalar />} />
        <Route path="/boshqalar" element={<Boshqalar />} />
      </Routes>
    </>
  );
}

export default App;
