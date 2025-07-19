import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUser, profileuser } from '../../slices/user';

export default function EditUserPage() {
  const { user } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user: user,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      dispatch(profileuser({ user }))
        .unwrap()
        .then((data) => {
          setFormData((prev) => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
          }));
        })
        .catch((error) => console.error('Failed to fetch user:', error));
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUser(formData))
      .unwrap()
      .then(() => {
        console.log('Submitting:', formData);
        navigate(`/home/profil/${user}`);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleChangePassword = () => {
    navigate(`/change-password/${user}`);
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
