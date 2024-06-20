import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const client = () => {
    const [clientList, setclientList] = useState([]);
    const [editingClient, seteditingClient] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedAddress, seteditedAddress] = useState('');
    const [editedImage, setEditedImage] = useState('');
    useEffect(() => {
        fetchClient();
    }, []);

    const fetchClient = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/clients');
            setclientList(response.data);
        } catch (error) {
            console.error('Error fetching client:', error);
        }
    };

    const handleEdit = (client) => {
        seteditingClient(client);
        setEditedName(client.name);
        seteditedAddress(client.address);
        setEditedImage(client.image);
    };

    const handleCancelEdit = () => {
        seteditingClient(null);
        setEditedName('');
        seteditedAddress('');
        setEditedImage('');
    };

    const handleSaveEdit = async () => {
        try {
          const formData = new FormData(); // Create a new FormData object
    
          formData.append('name', editedName);
          formData.append('address', editedAddress);
          if (editedImage) { // Check if an image is selected
            formData.append('image', editedImage); // Append the image to the FormData
          }
    
          await axios.put(`http://localhost:5000/api/clients/${editingClient._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the Content-Type header
            },
          });
    
          // Update client data and image URL in state
          const updatedClient = await axios.get(`http://localhost:5000/api/clients`); // Fetch the updated client data
          fetchClient()
          setclientList(
            clientList.map((client) => (client._id === updatedClient.data._id ? updatedClient.data : client))
          );
          seteditingClient(null);
          setEditedName('');
          seteditedAddress('');
          setEditedImage(null);
        } catch (error) {
          console.error('Error updating client:', error);
        }
      };
    
    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`http://localhost:5000/api/clients/${clientId}`);
            fetchClient();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
                <h1 className='text-2xl font-bold underline'>client List</h1>
            </div>
            <table className="table border border-gray-300 border-collapse shadow-lg shadow-black">
                <thead className='bg-red-600'>
                    <tr>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">S.N.</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Name</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Address</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Logo</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Edit</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {clientList.map((client, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-4">{index + 1}</td>
                            <td className="border border-gray-300 p-4">{client.name}</td>
                            <td className="border border-gray-300 p-4">{client.address}</td>
                            <td className="border border-gray-300 p-4 overflow-hidden h-20"><img className="object-cover h-full w-full" src={`http://localhost:5000/uploads/${client.image}`} alt="none" /></td>
                            <td className="border border-gray-300 p-4">
                                <button onClick={() => handleEdit(client)} className='bg-green-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-green-500'>
                                    <FaEdit />
                                </button>
                            </td>
                            <td className="border border-gray-300 p-4">

                                <button onClick={() => handleDelete(client._id)} className='bg-red-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-red-500'>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingClient && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit client</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedAddress}
                            onChange={(e) => seteditedAddress(e.target.value)}
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

export default client;

