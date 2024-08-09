import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubCategory = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('active');
  const [sequence, setSequence] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        console.log(categories);
        
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add-subcategory', {
        name,
        categoryId,
        image,
        status,
        sequence,
      });
      if (response.data.success) {
        navigate('/adminPortal/subcategory');
      } else {
        alert('Error adding subcategory');
      }
    } catch (error) {
      console.error('Error during adding subcategory', error);
    }
  };

  return (
   <>

   <div className="main-con">
    
    <div className="sub-con"> 
    <div className="addsubcat">
    <h2>Add SubCategory</h2>
  <form onSubmit={handleSubmit}>
    <table>
      <tbody>
        <tr>
          <td>SubCategory Name:</td>
          <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></td>
        </tr>
        <tr>
          <td>Category:</td>
          <td>
            <select    className="status" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Image URL:</td>
          <td><input type="text" value={image} onChange={(e) => setImage(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>
            <select    className="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Sequence:</td>
          <td><input type="number" value={sequence} onChange={(e) => setSequence(Number(e.target.value))} /></td>
        </tr>
        <tr>
          <td colSpan="2">
            <button type="submit" className='sub-btn'>Add SubCategory</button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>


    </div>

    </div>
   </div>
   </>
  );
};

export default AddSubCategory;
