import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Portfolio = () => {
    const [portfolioList, setPortfolioList] = useState([]);
    const [editingPortfolio, setEditingPortfolio] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedService, setEditedService] = useState('');
    const [editedCategory, setEditedCategory] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const[link, setLink]=useState('')

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profiles');
            setPortfolioList(response.data);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    const handleEdit = (portfolio) => {
        setEditingPortfolio(portfolio);
        setEditedName(portfolio.name);
        setEditedService(portfolio.service);
        setEditedCategory(portfolio.category);
        setLink(portfolio.link)
        setEditedImage(portfolio.image);
    };

    const handleCancelEdit = () => {
        setEditingPortfolio(null);
        setEditedName('');
        setEditedService('');
        setEditedCategory('');
        setLink('')
        setEditedImage('');
    };

    const handleSaveEdit = async () => {
        try {
          const formData = new FormData(); // Create a new FormData object
    
          formData.append('name', editedName);
          formData.append('service', editedService);
          formData.append('category', editedCategory);
          formData.append('link', link);

    
          if (editedImage) { // Check if an image is selected
            formData.append('image', editedImage); // Append the image to the FormData
          }
    
          await axios.put(`http://localhost:5000/api/profiles/${editingPortfolio._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the Content-Type header
            },
          });
    
          // Update portfolio data and image URL in state
          const updatedPortfolio = await axios.get(`http://localhost:5000/api/profiles`); // Fetch the updated portfolio data
          fetchPortfolio()
          setPortfolioList(
            portfolioList.map((portfolio) => (portfolio._id === updatedPortfolio.data._id ? updatedPortfolio.data : portfolio))
          );
          setEditingPortfolio(null);
          setEditedName('');
          setEditedService('');
          setEditedCategory('');
          setLink('')
          setEditedImage(null);
        } catch (error) {
          console.error('Error updating portfolio:', error);
        }
      };
    
    const handleDelete = async (portfolioId) => {
        try {
            await axios.delete(`http://localhost:5000/api/profiles/${portfolioId}`);
            fetchPortfolio();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
                <h1 className='text-2xl font-bold underline'>Portfolio List</h1>
            </div>
            <table className="table border border-gray-300 border-collapse shadow-lg shadow-black">
                <thead className='bg-red-600'>
                    <tr>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">S.N.</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Name</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Service</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Category</th>
                        <th className="text-left border border-gray-300 p-4 bg-green-600 text-white shadow">Portfolio image</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Edit</th>
                        <th className="text-right border border-gray-300 p-4 bg-green-600 cursor-pointer text-white shadow">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolioList.map((portfolio, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-4">{index + 1}</td>
                            <td className="border border-gray-300 p-4">{portfolio.name}</td>
                            <td className="border border-gray-300 p-4">{portfolio.service}</td>
                            <td className="border border-gray-300 p-4">{portfolio.category}</td>
                            <td className="border border-gray-300 p-4 overflow-hidden h-20"><img className="object-cover h-full w-full" src={`http://localhost:5000/uploads/${portfolio.image}`} alt="none" /></td>
                            <td className="border border-gray-300 p-4">
                                <button onClick={() => handleEdit(portfolio)} className='bg-green-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-green-500'>
                                    <FaEdit />
                                </button>
                            </td>
                            <td className="border border-gray-300 p-4">

                                <button onClick={() => handleDelete(portfolio._id)} className='bg-red-600 cursor-pointer rounded-lg p-2 text-sm font-semibold text-white hover:scale-90 hover:bg-red-500'>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingPortfolio && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Portfolio</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-2 w-full"
                            value={editedService}
                            onChange={(e) => setEditedService(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            value={editedCategory}
                            onChange={(e) => setEditedCategory(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 mb-4 w-full"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder='Enter Link address'
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

export default Portfolio;

