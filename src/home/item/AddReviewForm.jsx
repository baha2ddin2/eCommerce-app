import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function AddReviewForm({ productId, onSuccess }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/api/reviews", {
        product_id: productId,
        user: "current_user", // ❗️غيّر هذا حسب المستخدم الحالي
        comment,
        rating,
      });

      onSuccess(); // تحديث قائمة المراجعات بعد الإرسال
      setComment("");
      setRating(0);
    } catch (err) {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 4, width: "100%", maxWidth: 600, mx: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Add Your Review
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Comment"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            Rating:
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </Stack>
    </Box>
  );
}
