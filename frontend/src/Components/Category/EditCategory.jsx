import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('active');
  const [sequence, setSequence] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/category/${id}`);
        const category = response.data;
        setName(category.name);
        setImage(category.image);
        setStatus(category.status);
        setSequence(category.sequence);
      } catch (error) {
        console.error('Error fetching category', error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/update-category/${id}`, {
        name,
        image,
        status,
        sequence,
      });
      if (response.data.success) {
        navigate('/adminPortal/category');
      } else {
        alert('Error updating category');
      }
    } catch (error) {
      console.error('Error during updating category', error);
    }
  };

  return (
   <>
    <div className="main-con">
      <div className="sub-con">
        <div className="editcat">
            
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>


      <table>
  <tbody>
    <tr>
      <td><label>Category Name</label></td>
      <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></td>
    </tr>
    <tr>
      <td><label>Image URL</label></td>
      <td><input type="text" value={image} onChange={(e) => setImage(e.target.value)} /></td>
    </tr>
    <tr>
      <td><label>Status</label></td>
      <td>
        <select value={status}  className='status' onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><label>Sequence</label></td>
      <td><input type="number" value={sequence} onChange={(e) => setSequence(Number(e.target.value))} /></td>
    </tr>
    <tr>
      <td colSpan="2">
        <button type="submit" className='sub-btn'>Update Category</button>
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

export default EditCategory;
