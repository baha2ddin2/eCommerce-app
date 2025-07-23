import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Allproduct } from '../slices/product';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.data) || [];
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(Allproduct());
  }, [dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const found = products.find((p) => p.name.toLowerCase() === inputValue.toLowerCase());
      if (found) {
        navigate(`item/${found.id}`);
      } else {
        alert('Product not found');
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={products.map((option) => option.name)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
