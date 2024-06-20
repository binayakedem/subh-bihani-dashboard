import React, { useState } from 'react';
import axios from 'axios';
import MyPng from '../assets/png.png';

const PortfolioAdd = () => {
  const [companyName, setCompanyName] = useState('');
  const [services, setServices] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // State for success popup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send files and text data
    const formData = new FormData();
    formData.append('name', companyName);
    formData.append('service', services);
    formData.append('category', category);
    formData.append('link', link);
    formData.append('image', file);

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:5000/api/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) { // Check for success status code
        setIsSuccess(true); // Show success popup
        setCompanyName(''); // Clear form fields
        setServices('');
        setCategory('');
        setLink('');
        setFile(null);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error adding portfolio:', error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div className='flex flex-row justify-center items-start'>
      <div className='flex flex-col justify-center items-center gap-4 w-full md:w-1/2'>
        <div>
          <h1 className='text-2xl font-bold underline'>Please Upload the Portfolio Detail</h1>
        </div>
        <div className='flex flex-col justify-start items-center gap-4'>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
            placeholder='Enter Company Name'
          />
          <input
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
            placeholder='Enter Services'
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
            placeholder='Enter Category'
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className='border border-blue-500 p-2 lg:px-20 rounded-sm text-black'
            placeholder='Enter link address'
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder='Please Insert file'
          />
          <button
            onClick={handleSubmit}
            className='bg-green-600 px-8 py-3 rounded-md text-lg font-bold text-white hover:bg-green-500 hover:scale-90 transition-all duration-500 ease-in-out'
          >
            Submit
          </button>
          {isSuccess && (
            <div className='text-green-500 bg-green-100 p-4 rounded-md'>
              Portfolio added successfully!
            </div>
          )}
        </div>
      </div>
      <div className='hidden md:block w-2/5'>
        <img src={MyPng} alt="png" className='w-full h-auto' />
      </div>
    </div>
  );
};

export default PortfolioAdd;
