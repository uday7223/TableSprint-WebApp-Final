import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [subcategory_id, setSubcategoryId] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('active');
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/subcategories');
      setSubcategories(response.data);
    };
    
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    };

    fetchSubCategories();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-product', {
        name, subcategory_id, category_id, image, status
      });
      navigate('/adminPortal/product');
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
   <>
   <div className="main-con">
    <div className="sub-con">
    <div className="addprod">
  <h2>Add Product</h2>
  <form onSubmit={handleSubmit}>
    <table>
      <tbody>
        <tr>
          <td><label>Product Name</label></td>
          <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></td>
        </tr>
        <tr>
          <td><label>Sub Category</label></td>
          <td>
            <select className="status" value={subcategory_id} onChange={(e) => setSubcategoryId(e.target.value)} required>
              <option value="">Select Sub Category</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td><label>Category</label></td>
          <td>
            <select className="status" value={category_id} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td><label>Image</label></td>
          <td><input type="text" value={image} onChange={(e) => setImage(e.target.value)} required /></td>
        </tr>
        <tr>
          <td><label>Status</label></td>
          <td>
            <select className="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button className="sub-btn" type="submit">Add Product</button>
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

export default AddProduct;
