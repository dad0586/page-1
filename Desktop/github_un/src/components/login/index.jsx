import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.scss";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const correctUsername = "otaboy";
    const correctPassword = "12345";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === correctUsername && password === correctPassword) {
            setError("");
            navigate("/home");
        } else {
            setError("❌ Login yoki parol xato!");
        }
    };

    return (
        <>
            <div className="container">
                <div className="login-container">
                    <div className="login-card">
                        <h2>Tizimga Kirish</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Login"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Parol"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Kirish</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
