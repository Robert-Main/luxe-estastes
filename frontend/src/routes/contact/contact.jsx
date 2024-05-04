import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./contact.scss";

const Contact = () => {
    const { updateUser } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError("");

        try {
            const res = await apiRequest.post("/auth/login", {
                username: data.username,
                message: data.message,
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
                <div className="top">
                    <h1>
                        For any inquiries or more information about renting or
                        buying apartments on this site, please send an email to
                        luxerealestate@gmail.com
                    </h1>
                    <p>
                        please send us an email at luxerealestate@gmail.com if
                        you have any inquiries, suggestions, or if you want to
                        know how to add your property to our site. We will get
                        back to you as soon as possible.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Contact us</h1>
                    <input
                        {...register("email", { required: true })}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && <span>Email is required</span>}
                    <textarea
                        {...register("message", { required: true })}
                        type="text"
                        placeholder="message"
                        rows={5}
                    />
                    {errors.message && <span>Message is required</span>}

                    <button disabled={isLoading}>Send</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
};

export default Contact;
