import {
  Box,
  TextField,
  Button,
  Rating,
  Typography,
  Stack,
} from "@mui/material";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import { addReview } from "../../slices/product";

export default function AddReviewForm({ productId, onSuccess }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);
      useEffect(() => {
       const encrypted = localStorage.getItem("username");
        if (encrypted) {
          const bytes = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY);
          const decryptedName = bytes.toString(CryptoJS.enc.Utf8);
          setUser(decryptedName)
        }
      }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addReview({productId, user, rating, comment}))
    .unwrap()
    .then(()=>{
      setLoading(false);
      setError("");
      setComment("");
      setRating(0);
      onSuccess()
    }).catch(()=>{
      setLoading(false);
      setError("Failed to submit review");
    })
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
