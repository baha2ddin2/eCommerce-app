import Link from '@mui/material/Link';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from "./search/search";
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import CategoryHeader from './category/headerCategory';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../slices/user';

export default function CustomHeader() {
  const dispatch = useDispatch()
  const [checkAuthState , setCkeckAuthState ] =useState(true)
  const [user, setUser] = useState(null);
    useEffect(() => {
      dispatch(checkAuth())
      .unwrap()
      .then(setCkeckAuthState(true))
      .catch(setCkeckAuthState(false))
      const encrypted = localStorage.getItem("username");
      if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_SECRET_KEY);
        const decryptedName = bytes.toString(CryptoJS.enc.Utf8);
        setUser(decryptedName)
      }
    }, [dispatch]);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div>
        <Link component={RouterLink} to="/home" underline="none">
          <h1>LOGO</h1>
        </Link>
      </div>

      <div>
        <Link component={RouterLink} to="/home" underline="none">
          <h2 style={{ color: "black" }}>Home</h2>
        </Link>
      </div>
      <div>
        <CategoryHeader/>
      </div>

      <div>
        <Search />
      </div>


      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {user && checkAuth.fulfilled ? (
          <>
            <Link component={RouterLink} to={`profil/${user}`} underline="none">
              <FaceIcon />
            </Link>
            <Link component={RouterLink} to={`cart/${user}`} underline="none">
              <ShoppingCartIcon />
            </Link>
          </>
        ) : (
          <Link component={RouterLink} to="/" underline="none">
            <FaceIcon />
          </Link>
        )}
      </div>
    </nav>
  );
}
