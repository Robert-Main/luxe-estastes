import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./register.scss";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { username, email, password } = data; // Destructure values from form data
        setError("");
        setIsLoading(true);

        try {
            const res = await apiRequest.post("/auth/register", {
                username,
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create an Account</h1>
                    <input
                        {...register("username", { required: true })}
                        type="text"
                        placeholder="Username"
                    />
                    {errors.username && <span>Username is required</span>}

                    <input
                        {...register("email", { required: true })}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && <span>Email is required</span>}

                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <span>Password is required</span>}

                    <button type="submit" disabled={isLoading}>
                        Register
                    </button>
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Register;
