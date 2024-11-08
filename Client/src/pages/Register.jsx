import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const RegisterHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/register', registerData);
            setResponseMessage(response.data.message);  
            console.log(response);
        } catch (error) {
            setResponseMessage('Registration failed');  
            console.error("Error:", error);
        }
    };

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form
                className='flex items-center justify-center flex-col w-full max-w-md p-5 border rounded-lg shadow-lg'
                onSubmit={RegisterHandler}
            >
                <input
                    value={registerData.name}
                    onChange={handleChange}
                    className='m-3 border rounded-lg text-xl text-zinc-500 w-full p-3'
                    type="text"
                    name='name'
                    placeholder='Enter name'
                />
                <input
                    value={registerData.email}
                    onChange={handleChange}
                    className='m-3 border rounded-lg text-xl text-zinc-500 w-full p-3'
                    type="email"
                    name='email'
                    placeholder='Enter email'
                />
                <input
                    value={registerData.password}
                    onChange={handleChange}
                    className='m-3 border rounded-lg text-xl text-zinc-500 w-full p-3'
                    type="password"
                    name='password'
                    placeholder='Enter password'
                />
                <button
                    className='m-3 border rounded-lg text-xl text-white font-bold w-full p-3 bg-red-500'
                    type='submit'
                >
                    Register
                </button>
                {responseMessage && <p className='text-center text-lg mt-4'>{responseMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
