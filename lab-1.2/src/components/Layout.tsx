import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <Header />
      <nav className="nav">
        <NavLink className="nav__link" to="/employees">
          Employees
        </NavLink>
        <NavLink className="nav__link" to="/organization">
          Organization
        </NavLink>
      </nav>

      <Outlet />

      <Footer />
    </>
  );
}