import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");
  const [sequence, setSequence] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addcategory",
        {
          name,
          image,
          status,
          sequence,
        }
      );
      if (response.data.success) {
        navigate("/adminPortal/category");
      } else {
        alert("Error adding category");
      }
    } catch (error) {
      console.error("Error during adding category", error);
    }
  };

  return (
    <>
      <div className="main-con">
       <div className="sub-con">
       <div className="addcategory">
          <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>Category Name:</td>
                    <td>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Category Name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Image URL:</td>
                    <td>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image URL"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Status:</label>
                    </td>
                    <td>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="status"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Sequence:</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={sequence}
                        onChange={(e) => setSequence(Number(e.target.value))}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button type="submit" className="sub-btn">
                        Add Category
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default AddCategory;
