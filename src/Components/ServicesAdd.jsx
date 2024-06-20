import React, { useState } from 'react';
import MyPng from '../assets/png.png';
import axios from 'axios';

const ServiceAdd = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [icon, setIcon] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', icon);

        try {
            const response = await axios.post('http://localhost:5000/api/service', formData);
            console.log('Service added successfully:', response.data);
            setMessage('Service added successfully!');
            setError(null);
            // Optionally, you can redirect the user or show a success message here
        } catch (error) {
            console.error('Error adding service:', error);
            setMessage(null);
            setError('Failed to add service. Please try again later.');
            // Optionally, you can show an error message here
        }
    };

    return (
        <div className='flex flex-row justify-center items-start'>
            <div className='flex flex-col justify-center items-center gap-4 w-full md:w-1/2'>
                <div>
                    <h1 className='text-2xl font-bold underline'>Please Upload the Service Detail</h1>
                </div>
                <form onSubmit={handleFormSubmit} className='flex flex-col justify-start items-center gap-4'>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
                        placeholder='Enter title'
                    />
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
                        placeholder='Enter Contents '
                    />
                    <input
                        type="file"
                        onChange={(e) => setIcon(e.target.files[0])}
                        placeholder='Please Insert icon'
                    />
                    <button type="submit" className='bg-green-600 px-8 py-3 rounded-md text-lg font-bold text-white hover:bg-green-500 hover:scale-90 transition-all duration-500 ease-in-out'>Submit</button>
                </form>
                {message && (
                    <div className="bg-green-200 text-green-800 p-4 rounded-md mt-4">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-200 text-red-800 p-4 rounded-md mt-4">
                        {error}
                    </div>
                )}
            </div>
            <div className='hidden md:block w-2/5'>
                <img src={MyPng} alt="png" className='w-full h-auto' />
            </div>
        </div>
    );
};

export default ServiceAdd;
