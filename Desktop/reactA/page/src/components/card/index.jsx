import "./main.scss"

const Card = () => {
    return (
        <>
            <div className="card">
                <div className="card-car-name">
                    <h1>
                        Car name
                    </h1>
                    <p>

                    </p>
                </div>
                <div className="card-car__img">
                    <img src="" alt="Car image" />
                </div>
                <div className="card-car__spesification">
                    <div>90L</div>
                    <div>Manual</div>
                    <div>People</div>
                </div>
                <div className="card-car__buy">
                    <div className="card-car__prise">Prise: /<span>day</span> </div>
                    <div className="card-car_btn">
                        <button>Rent Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;