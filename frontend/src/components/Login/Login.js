import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your authentication logic
        console.log("Email:", email);
        console.log("Password:", password);
        try {
            //if (response) {
            // onLogin(data.access); // Pass the token to the parent component
            localStorage.setItem("token", 'HR Personnel'); // Store the token in localStorage

            navigate("/dashboard"); // Redirect to home page after login
            window.location.reload(); // Reload the page to update the state
            // } else {
            //     alert("Login failed");
            // }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }

    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Log In SMA</h2>

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#000",
        padding: "20px",
    },

    card: {
        width: "420px",
        backgroundColor: "#000",
        padding: "50px 40px",
        border: "1px solid #2f3336",
        borderRadius: "18px",
    },

    title: {
        textAlign: "center",
        color: "#fff",
        fontSize: "36px",
        fontWeight: "700",
        marginBottom: "35px",
    },

    field: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
    },

    input: {
        height: "56px",
        padding: "0 16px",
        marginTop: "8px",

        backgroundColor: "#000",

        border: "1px solid #2f3336",

        borderRadius: "8px",

        color: "#fff",

        fontSize: "16px",

        outline: "none",
    },

    button: {
        width: "100%",

        height: "50px",

        border: "none",

        borderRadius: "30px",

        backgroundColor: "#fff",

        color: "#000",

        fontSize: "16px",

        fontWeight: "700",

        cursor: "pointer",

        marginTop: "10px",
    },
};