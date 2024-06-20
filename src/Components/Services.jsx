
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Services = () => {
    const [serviceList, setserviceList] = useState([]);
    const [editingService, seteditingService] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedContent, seteditedContent] = useState('');
    const [editedImage, setEditedImage] = useState('');
    useEffect(() => {
        fetchService();
    }, []);

    const fetchService = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/service');
            setserviceList(response.data);
        } catch (error) {
            console.error('Error fetching Services:', error);
        }
    };

    const handleEdit = (Services) => {
        seteditingService(Services);
        setEditedName(Services.title);
        seteditedContent(Services.content);
        setEditedImage(Services.image);
    };

    const handleCancelEdit = () => {
        seteditingService(null);
        setEditedName('');
        seteditedContent('');
        setEditedImage('');
    };

    const handleSaveEdit = async () => {
        try {
          const formData = new FormData(); // Create a new FormData object
    
          formData.append('title', editedName);
          formData.append('content', editedContent);
          if (editedImage) { // Check if an image is selected
            formData.append('image', editedImage); // Append the image to the FormData
          }
    
          await axios.put(`http://localhost:5000/api/service/${editingService._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the Content-Type header
            },
          });
    
          // Update Services data and image URL in state
          const updatedService = await axios.get(`http://localhost:5000/api/service`); // Fetch the updated Services data
          fetchService()
          setserviceList(
            serviceList.map((Services) => (Services._id === updatedService.data._id ? updatedService.data : Services))
          );
          seteditingService(null);
          setEditedName('');
          seteditedContent('');
          setEditedImage(null);
        } catch (error) {
          console.error('Error updating Services:', error);
        }
      };
    
    const handleDelete = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/service/${serviceId}`);
            fetchService();
        } catch (error) {
            console.error('Error deleting Services:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
                <h1 className='text-2xl font-bold underline'>Services List</h1>
            </div>
            <table className="table border border-gray-300 border-collapse shadow-lg shadow-black">
                <thead className='bg-red-600'>
                    <tr>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">S.N.</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Title</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Content</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Image</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Edit</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceList.map((Services, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-4">{index + 1}</td>
                            <td className="border border-gray-300 p-4">{Services.title}</td>
                            <td className="border border-gray-300 p-4">{Services.content}</td>
                            <td className="border border-gray-300 p-4 overflow-hidden h-20"><img className="object-fill h-full w-full" src={`http://localhost:5000/uploads/${Services.image}`} alt="none" /></td>
                            <td className="border border-gray-300 p-4">
                                <button onClick={() => handleEdit(Services)} className='bg-green-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-green-500'>
                                    <FaEdit />
                                </button>
                            </td>
                            <td className="border border-gray-300 p-4">

                                <button onClick={() => handleDelete(Services._id)} className='bg-red-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-red-500'>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingService && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Services</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedContent}
                            onChange={(e) => seteditedContent(e.target.value)}
                        />
                       
                       <input
            type="file"
            onChange={(e) => setEditedImage(e.target.files[0])}
        
          />
               
                        <button
                            className="bg-green-600 text-white py-2 px-4 rounded-lg mr-2 hover:bg-green-700"
                            onClick={handleSaveEdit}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Services;


