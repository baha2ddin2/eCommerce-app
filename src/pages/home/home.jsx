import CustomHeader from "../../components/header"
import { Outlet } from "react-router-dom"


 export default function Home() {
  return (
    <>
        <CustomHeader/>
        <Outlet/>
    </>
  )}