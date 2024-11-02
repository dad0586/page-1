import { useState } from "react";
import { Pagination } from "@mui/material";
import './pagination.scss';

const Pagination1 = ({ count, onPageChange }) => {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        onPageChange(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="pagination-container">
            <Pagination
                className="pagination"
                count={count}
                page={page}
                onChange={handleChange}
                variant="outlined" 
                shape="rounded" 
            />
        </div>
    );
};

export default Pagination1;
