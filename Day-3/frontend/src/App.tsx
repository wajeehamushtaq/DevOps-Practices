import { useState, useEffect } from 'react';
import { getUsers, createUser } from './api';
import type { User, CreateUserData } from './api';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    age: 0,
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const response = await getUsers();
    if (response.success && response.data) {
      setUsers(response.data);
    } else {
      setError(response.error || 'Failed to fetch users');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.name || !formData.email || formData.age <= 0) {
      setError('Please fill in all fields with valid data');
      setLoading(false);
      return;
    }

    const response = await createUser(formData);
    if (response.success && response.data) {
      setSuccess('User created successfully!');
      setFormData({ name: '', email: '', age: 0 });
      fetchUsers(); // Refresh the user list
    } else {
      setError(response.error || response.message || 'Failed to create user');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="app-container">
      <h1>User Management System</h1>
      
      {/* Create User Form */}
      <div className="form-container">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter age"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      {/* Users List */}
      <div className="users-container">
        <div className="users-header">
          <h2>Users List</h2>
          <button onClick={fetchUsers} disabled={loading} className="refresh-btn">
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {loading && users.length === 0 ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="no-users">No users found. Create one above!</div>
        ) : (
          <div className="users-list">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-age">Age: {user.age}</p>
                  {user.createdAt && (
                    <p className="user-date">
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
