import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Rating,
  Container
} from "@mui/material";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <Typography>No reviews yet.</Typography>;
  }

  return (
    <Container>
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>

      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <Paper key={index} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                {review.user}
              </Typography>
              <Rating value={review.rating} readOnly />
            </Stack>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {review.comment}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="caption" color="text.secondary">
              {new Date(review.created_at).toLocaleDateString()}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
    </Container>
  );
}
