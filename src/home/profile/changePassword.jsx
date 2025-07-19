import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  Alert,
} from '@mui/material';

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    // Add real API call or Redux dispatch here
    console.log('Changing password...', formData);
    setSuccess('Password updated successfully.');
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h5" mb={2}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Update Password
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
