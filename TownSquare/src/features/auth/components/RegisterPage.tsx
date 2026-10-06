import React from "react";

export const RegisterPage = () => {
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [passwordVisibility, setPasswordVisibility] = React.useState({
        first: false,
        second: false,
    });

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setSuccess("");
        } else {
            setError("");
            /* send the formData to backend API to create the account */
            setSuccess("Account created successfully!");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = (field: "first" | "second") => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    return <div>
        <h2>Create your TownSquare account</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
            />

            <label htmlFor="email">Email</label>
            <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
            />

            <label htmlFor="password">Password</label>
            <input
                type={passwordVisibility.first ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
            />
            {/* add toggleable eye icon to show/hide password */}
            <button type="button" onClick={() => togglePasswordVisibility("first")}>
                {passwordVisibility.first ? "Hide password" : "Show password"}
            </button>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type={passwordVisibility.second ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
            />
            {/* add toggleable eye icon to show/hide password */}
            <button type="button" onClick={() => togglePasswordVisibility("second")}>
                {passwordVisibility.second ? "Hide confirm password" : "Show confirm password"}
            </button>

            <button id="create-account-button" type="submit">Create account</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {/* on success, redirect to home page after a little wait */}

        <p>Already have an account? <a href="/login">Login</a></p>
    </div>;
};