import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const url = "http://127.0.0.1:8000/token"



const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required();

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [loginError, setLoginError] = useState(null);
    interface LoginFormData {
        username: string;
        password: string;
    }
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post('http://localhost:8000/token', data); 
            localStorage.setItem('token', response.data.access_token);
            // navigate('/chat'); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
            setLoginError(error.response?.data?.detail || 'Login failed');
        }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {loginError && <p>{loginError}</p>}
            <button type="submit">Login</button>
    
            <p>Not registered? <Link to="/register">Register here</Link></p>
        </form>
    );
}

export default Login;