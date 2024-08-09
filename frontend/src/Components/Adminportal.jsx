import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Category from './Category/Category'
import AddCategory from './Category/AddCategory'
import EditCategory from './Category/EditCategory'
import SubCategory from './SubCategory/SubCategory'
import AddSubCategory from './SubCategory/AddSubCategory'
import EditSubCategory from './SubCategory/EditSubCategory'
import Product from './Products/Product'
import EditProduct from './Products/EditProduct'
import AddProduct from './Products/AddProduct'

const Adminportal = () => {
  return (

    <>
     <Navbar/>
     <Sidebar/>

            <Routes>
                
            <Route path="/" element={<Dashboard/>} />
            <Route path="/category/" element={<Category />} />
            <Route path='/addcategory' element={<AddCategory />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/subcategory" element={<SubCategory/>} />
            <Route path="/addsubcategory" element={<AddSubCategory/>} />
            <Route path="/editsubcategory/:id" element={<EditSubCategory/>} />
            <Route path="/product" element={<Product/>}/>
            <Route path="/editproduct/:id" element={<EditProduct/>}/>
            <Route path="/addproduct" element={<AddProduct/>}/>
            
            </Routes>  

    
    </>


)
}

export default Adminportal