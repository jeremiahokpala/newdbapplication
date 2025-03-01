import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', age: '', hobby: '' });

    // Fetch users from the backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/add-user', formData);
            setFormData({ name: '', age: '', hobby: '' });
            fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Delete a user
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/delete-user/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">User Management App</h2>

            {/* User Input Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <input className="form-control" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input className="form-control" type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <input className="form-control" type="text" name="hobby" placeholder="Hobby" value={formData.hobby} onChange={handleChange} required />
                </div>
                <button className="btn btn-success w-100" type="submit">Add User</button>
            </form>

            {/* User List */}
            <h3>Users List</h3>
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.name} (Age: {user.age}, Hobby: {user.hobby})
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;