import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const[input, setInput] = useState({
        fname:'',
        lname:'',
        address:'',
        email:'',
        mobile:'',
    });

const navigate = useNavigate();

const handleChange = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
}
const handlesave = async(e) => {
    e.preventDefault();
    const { fname, lname, address, email, mobile } = input;
    try {
        const response = await axios.post('http://localhost:8080/backend/Add.php',input);
        const data = response.data;
        console.log(data);
            if (data.success) {
                alert("Customer added successfully");
                navigate('/');
            } else {
                alert("Error adding customer");
                console.error(response.data.message);
            }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
}

  return (
    <div className='container my-5 w-50 border shadow-lg p-3'>
        <h1 className='fw-medium text-center'>Add Customer</h1>
        <form className='justify-content-center mt-3 p-2 m-3' method='POST'>  
            <div className="mb-3">
                <label htmlFor="fname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="fname" name="fname" value={input.fname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="lname" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lname" name="lname" value={input.lname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" name="address" value={input.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={input.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile No</label>
                <input type="number" className="form-control" id="mobile" name="mobile" value={input.mobile} onChange={handleChange} required />
            </div>
            
            
            <button type="submit" className="btn btn-primary" onClick={handlesave}>Submit</button>
        </form>
    </div>
  )
}

export default Add