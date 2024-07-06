import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:8000/register";

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const Register: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [registrationError, setRegistrationError] = useState(null);
    interface RegisterFormData {
        username: string;
        password: string;
    }
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await axios.post(url, data);
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error)){
                setRegistrationError(
                    error.response?.data?.detail || "failed to register"
                );
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {registrationError && <p>{registrationError}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" {...register("username")} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
    
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Register</button>

            <p>
                Already registered? <Link to="/login">Login here</Link>
            </p>
        </form>
    );
};

export default Register;
