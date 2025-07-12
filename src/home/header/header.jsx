import Link from '@mui/material/Link';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from "./search/search";
import { useEffect, useState } from 'react';

export default function CustomHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
    }
  }, []);

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
        <Link href="/home" underline="none">
          <h1>LOGO</h1>
        </Link>
      </div>

      <div>
        <Link href="/home" underline="none">
          <h2 style={{ color: "black" }}>Home</h2>
        </Link>
      </div>

      <div>
        <Search />
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {user ? (
          <>
            <Link href={`/home/profil/${user.user}`} underline="none">
              <FaceIcon />
            </Link>
            <Link href={`/home/cart/${user.user}`} underline="none">
              <ShoppingCartIcon />
            </Link>
          </>
        ) : (
          <Link href="/login" underline="none">
            <FaceIcon />
          </Link>
        )}
      </div>
    </nav>
  );
}
