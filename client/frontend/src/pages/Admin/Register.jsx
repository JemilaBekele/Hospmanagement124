import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import { sideBarData } from '../../data';
export default function Register() {
  const navigate= useNavigate()
  const [data, setData]= useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',
    address: '',
    role: 'nurse',
    Salary:'',
    phone: ''
  })
  const [errorMessage] = useState(''); // Added this line

  const registerUser = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, address, role, Salary, phoneNumber } = data;

    try {
      const response = await axios.post('/api/v1/auth/register', {
        firstName,
        lastName,
        email,
        password,
        address,
        role,
        Salary,
        phoneNumber,
      });

      const responseData = response.data;

      // Check if the response has an error message
      if (responseData.error) {
        // Check if the error is a validation error
        if (responseData.error.name === 'ValidationError') {
          // Extract and display individual validation error messages
          const validationErrors = Object.values(responseData.error.errors);
          validationErrors.forEach((error) => {
            toast.error(error.message);
          });
        } else {
          // Display a specific error message for email already used
          if (responseData.error.message.includes('email already used')) {
            toast.error('Email address is already in use. Please use a different email.');
          } else {
            // Display a generic error message for other types of errors
            toast.error(responseData.error.message || 'Registration failed. Please try again.');
          }
        }
      } else {
        setData({});
        toast.success('Registration successful! Please login.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        console.error('Axios response:', error.response.data);
        console.error('Axios status:', error.response.status);
        console.error('Axios headers:', error.response.headers);
      }
      toast.error('Registration failed. Please try again.');
    }
  };
  return (
   <section>
    <Navbar/>
    <div className='flex'>
      <SideBar sidebarData={sideBarData} />
    <div className='block '>
      <h2 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>Register</h2>

      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name first Name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name Last name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="nurse">Nurse</option>
            <option value="doctor">Doctor</option>
            <option value="registrar">Registrar</option>
            <option value="admin">Admin</option>
            <option value="radiology">Radiology</option>
            <option value="Labratory">Labratory</option>

          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Salary"
            value={data.Salary}
            onChange={(e) => setData({ ...data, Salary: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </Form.Group>

        <Button className='bg-black' type="submit">
          Submit
        </Button>
        {errorMessage && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                Error: {errorMessage}
              </div>
            )}
      </Form>

    </div></div></section>
  )
}
