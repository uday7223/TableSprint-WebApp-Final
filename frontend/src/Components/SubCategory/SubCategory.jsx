import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';


const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subcategories"
        );
        setSubCategories(response.data);
        console.log(subCategories);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-subcategory/${id}`);
      setSubCategories(subCategories.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Error deleting subcategory", error);
    }
  };

  return (
    <>
      <div className="main-con">
        <div className="sub-cat">
          <div className="con1">
            <h2><FormatListBulletedOutlinedIcon className="icon" /> SubCategories</h2>
            <div>
              <Link to="/adminPortal/addsubcategory">
                <button className='main-btn'> Add SubCategory</button>
              </Link>
            </div>
          </div>

          <div className="con2">

          <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>SubCategory Name</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Sequence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory) => (
            <tr key={subCategory.id}>
              <td>{subCategory.id}</td>
              <td>{subCategory.name}</td>
              <td>{subCategory.category_name}</td> {/* Updated to display category_name */}
              <td>{subCategory.image}</td>
              <td>{subCategory.status}</td>
              <td>{subCategory.sequence}</td>
              <td>
                <Link to={`/adminPortal/editsubcategory/${subCategory.id}`}>
                  <button className='table-btn'>Edit</button>
                </Link>
                <button className='table-btn' onClick={() => handleDelete(subCategory.id)}>Delete</button>
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

export default SubCategory;
