import { Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../slices/product';
import { useNavigate } from 'react-router-dom';

export default function CategoryHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.product.category) || [];

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (name) => {
    navigate(`/home/category/${name}`);
    handleClose();
  };


  return (
    <>
      <Button
        sx={{ textTransform: 'none', fontSize: '16px', color: 'black' }}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {categories.map((cat,key) => (
          <MenuItem key={key} onClick={() => handleSelect(cat.category)}>
            {cat.category}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
