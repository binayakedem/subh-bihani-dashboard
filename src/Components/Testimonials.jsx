import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTestimonials();
    }, [currentPage]); // Trigger fetchTestimonials whenever currentPage changes

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/testimonial`);
            setTestimonials(response.data);
          
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleDelete = async (testimonialId) => {
        try {
            await axios.delete(`http://localhost:5000/api/testimonial/${testimonialId}`);
            fetchTestimonials(); // Refresh testimonials after deletion
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
    };

  

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
                <h1 className='text-2xl font-bold underline'>Message List</h1>
            </div>

            <table className="table border border-gray-300 border-collapse shadow-lg shadow-black">
                <thead>
                    <tr>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">S.N.</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Name</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Message</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Star</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-4">{index + 1}</td>
                            <td className="border border-gray-300 p-4">{testimonial.name}</td>
                            <td className="border border-gray-300 p-4">{testimonial.message}</td>
                            <td className="border border-gray-300 p-4">{testimonial.star}</td>
                            <td className="border border-gray-300 p-4">
                                <button onClick={() => handleDelete(testimonial._id)} className='bg-red-600 cursor-pointer rounded-lg p-4 text-xl font-semibold text-white hover:scale-90 hover:bg-red-500'>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default Testimonials;
