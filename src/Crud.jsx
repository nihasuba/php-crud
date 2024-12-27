import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Crud = () => {
    

    const navigate = useNavigate();
    const handleAdd = () =>{
        navigate("/add");
    }


    //Edit customer
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [inputs, setInputs] = useState({
        fname: '',
        lname: '',
        address: '',
        email: '',
        mobile: ''
    });
    const handleEdit = (customer) =>{
        setSelectedCustomer(customer); // set customer data
        setInputs({
            fname: customer.fname,
            lname: customer.lname,
            address: customer.address,
            email: customer.email,
            mobile: customer.mobile
          });
        setShowEditModal(true); //  open the edit modal
        
    }
    const handlecloseModal = () => {
        setShowEditModal(false);
        setSelectedCustomer(null);

    }

    const handleUpdate = async(e) =>{
        e.preventDefault();
        const { fname, lname, address, email, mobile } = inputs;
        const id = selectedCustomer.id;
        console.log({
            id,
            fname,
            lname,
            address,
            email,
            mobile
        });
        try {
            const response = await axios.post('http://localhost:8080/backend/Edit.php', {
                id,   
                fname,
                lname,
                address,
                email,
                mobile
            });
            const data = response.data;
            console.log(data);

            if (data.success) {
                alert('Customer updated successfully');
                
                fetchCustomers();
            } else {
                alert('Error updating customer: ' + data.message);
            }
        } catch (error) {
            alert('Failed to update customer. ' + error.message);
        }
    }

    //List customer
    const[customers,setCustomers]=useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/backend/List.php');
            const data = response.data;
            console.log(data);

            if (data.success) {
                setCustomers(data.data);
            } else {
                setError(data.message || 'Error fetching customers');
            }
        } catch (error) {
            setError('Failed to fetch customers. ' + error.message);
        }
    };

    //Delete Customer
    const handleDelete = async(id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        try {
            const response = await axios.post('http://localhost:8080/backend/Delete.php', { id });
            const data = response.data;

            if (data.success) {
                alert('Customer deleted successfully');
                fetchCustomers();
            } else {
                alert('Error deleting customer: ' + data.message);
            }
        } catch (error) {
            alert('Failed to delete customer. ' + error.message);
        }
    }


    // const customers = [
    //     { id: 1, fname: 'John', lname: 'Doe', address: '123 Main St', email: 'john@example.com', mobile: '1234567890' },
    //     { id: 2, fname: 'Jane', lname: 'Smith', address: '456 Elm St', email: 'jane@example.com', mobile: '9876543210' },
    //   ];

  return (
    <div className='container my-5 p-5 '>
        <div className='row  border shadow-lg'>
            <div className='col'>
                <div className='card'>
                    <div className='card-header d-flex justify-content-between '>
                        <form className="d-flex" role="search">
                            <input className="form-control" placeholder="Search" aria-label="Search"/>
                        </form>
                        <h3 className=' fw-bold text-center'>Customer Details</h3>
                        <button className='btn btn-primary text-light m-2' onClick={handleAdd}>Add Customer</button>
                        
                    </div>
                    <div className='card-body'>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead className="thead-dark">
                                    <tr style={{ fontSize: "105%" }}>
                                        <th>First Name</th>
                                        <th>LastName</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Option</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer.id}>
                                            
                                            <td>{customer.fname}</td>
                                            <td>{customer.lname}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobile}</td>
                                            <td>
                                             <button className='btn btn-success text-light m-2' onClick = {() => handleEdit(customer)}>Edit</button>
                                             <button className='btn btn-danger text-light m-2' onClick={()=> handleDelete(customer.id)}>Delete</button>
                                            </td>
                                        </tr>
                                     ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No customers found</td>
                                        </tr>
                                    )}
                                    
                                         
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    {showEditModal && (
        <Modal show ={showEditModal} onHide={handlecloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fname"
                                    value={inputs.fname}
                                    onChange={(e) => setInputs({ ...inputs, fname: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lname"
                                    value={inputs.lname}
                                    onChange={(e) => setInputs({ ...inputs, lname: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={inputs.address}
                                    onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="mobile"
                                    value={inputs.mobile}
                                    onChange={(e) => setInputs({ ...inputs, mobile: e.target.value })}
                                />
                            </div>
                        </form>
                    </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleUpdate}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
    )}
    </div>
  )
}

export default Crud