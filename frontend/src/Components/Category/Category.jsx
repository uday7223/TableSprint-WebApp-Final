import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../CSS/category.css'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const  navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories(); 
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const editCategory = (id) => {
        navigate(`/adminPortal/editcategory/${id}`)
        console.log('Edit category with id', id);
  };

  const addCategory = (e) => {

  navigate('/adminPortal/addcategory')  

  }


  

  return (
   <>
    <div className="main-con">
    <div className='category'>

          <div className="con1"> 
                <h2><CategoryOutlinedIcon className="icon"/>Categories</h2>
                  <div className="addCat">
                    <button onClick={addCategory} className='main-btn'>Add Category</button>
                  </div>
          </div>

          <div className="con2">
                <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Category Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Sequence</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td><img src={category.image} alt={category.name} width="50" /></td>
                          <td>{category.status}</td>
                          <td>{category.sequence}</td>
                          <td>
                            <button className='table-btn' onClick={() => editCategory(category.id)}>Edit</button> 
                            <button className='table-btn' onClick={() => deleteCategory(category.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
          </div>
          
    </div>
    </div>
   
   </>
  );
};

export default Category;
