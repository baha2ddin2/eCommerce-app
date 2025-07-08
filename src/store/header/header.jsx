import Link from '@mui/material/Link';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from "./search/search";

export default  function CustomHeader() {
    return(
        <>
        <nav style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#f8f8f8"}}>
            <div>
                <h1>LOGO</h1>
            </div>
             <div>
                <Link href="/home" underline="none">
                    <h2 style={{color: "black"}}>Home</h2>
                </Link>

            </div>
            <div>
                <Search/>
            </div>
            <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                <FaceIcon  />
                <ShoppingCartIcon/>
            </div>

        </nav>
        </>

    )
}