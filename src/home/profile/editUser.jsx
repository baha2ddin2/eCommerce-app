import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'; // Uncomment if using Redux

export default function EditUserPage() {
  const navigate = useNavigate();

  // Replace these with real user data or Redux state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Load current user data here (from Redux, context, or API)
    // Example:
    // setFormData(currentUser)
    setFormData({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send update to backend or dispatch Redux action
    console.log('Submitting:', formData);
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h5" mb={2}>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
