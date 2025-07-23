import { Button, Card, CardContent, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <Card style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center', padding: '30px' }}>
      <CheckCircleOutline style={{ fontSize: 60, color: 'green' }} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Email Sent Successfully!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please check your inbox for further instructions.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </CardContent>
    </Card>
  );
}
