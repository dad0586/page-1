import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../boshsahifa/main.scss";
import useFetchData from "../../hooks/fetch";
import Pagination1 from "../../components/pagination/pagination.jsx";

const Bosh_sahifa = () => {
    const [page, setPage] = useState(1);
    const { data: shows, loading, error } = useFetchData("movie/popular", {
        desiredCount: 20,
        page,
    });

    return (
        <>
            {loading && <h1 style={{ color: "white" }}>Loadingggg....</h1>}
            {error && <h1 style={{ color: "white" }}>Errorr....</h1>}

            <div className="container">
                <div className="cards1">
                    {shows?.map((product) => (
                        <div className="card1" key={product.id}>
                            <img
                                src={"https://image.tmdb.org/t/p/w500" + product?.poster_path}
                                alt=""
                            />
                            <h3 style={{ color: "wheat" }} className="card-title1">
                                {product.title}
                            </h3>
                            <p className="card-text1">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination1 count={500} onPageChange={setPage} />
        </>
    );
};

export default Bosh_sahifa;
