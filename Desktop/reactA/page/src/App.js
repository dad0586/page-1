import Header from "./layout/header";
import Styles from "./assets/style/main.scss"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Category from "./pages/category";


function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/category" element={<Category/>} />
        </Routes>
    </>
  );
}

export default App;
