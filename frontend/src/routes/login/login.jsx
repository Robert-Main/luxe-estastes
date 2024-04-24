import { useContext, useState } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
    const { updateUser } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Define submit handler
    const onSubmit = async (data) => {
        setIsLoading(true);
        setError("");

        try {
            const res = await apiRequest.post("/auth/login", {
                username: data.username,
                password: data.password,
            });
            updateUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {" "}
                    <h1>Welcome back</h1>
                    <input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must be at least 3 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Username must not exceed 20 characters",
                            },
                        })}
                        type="text"
                        placeholder="Username"
                    />
                    {errors.username && <span>{errors.username.message}</span>}{" "}
                    {/* Display error message */}
                    <input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <span>{errors.password.message}</span>}{" "}
                    {/* Display error message */}
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Login;
