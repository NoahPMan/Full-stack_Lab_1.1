import { NavLink, Outlet } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout() {
  return (
    <>
    <Header />

    < nav className = "nav" >
      <div className="nav__links" >
        <NavLink className="nav__link" to = "/employees" >
          Employees
          </NavLink>
          < NavLink className = "nav__link" to = "/organization" >
            Organization
            </NavLink>
            </div>

            < div className = "nav__auth" >
              <SignedOut>
              <SignInButton mode="modal" >
                <button type="button" className = "nav__button" >
                  Log in
                  </button>
                  </SignInButton>
                  </SignedOut>

                  < SignedIn >
                  <UserButton />
                  </SignedIn>
                  </div>
                  </nav>

                  < Outlet />
                  <Footer />
                  </>
  );
}
