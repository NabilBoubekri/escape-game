import { openOffcanvas } from "../../assets/tools";
import { NavItem } from "./navItem";
import "../../assets/styles/header.css";
import { useAuth } from "../context/AuthContext";

export const Header: React.FC = () => {
  const { isAuth } = useAuth()
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler bg-white"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openOffcanvas("offcanvasDarkNavbar");
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex={-1}
        id="offcanvasDarkNavbar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Maison Horrifique</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <NavItem href="/" label="Home" />
            <NavItem href="/sessions" label="Sessions" />
            <NavItem href="/reservation" label="Réservation" />
            <NavItem href="/contact" label="Contact" />
            <NavItem href="/login" label="Login"/>
            { 
              isAuth &&
              <NavItem href="/admin" label="Dashboard"/>
            }
            {
              isAuth && 
              <NavItem href="/admin/create" label="Create Session"/>
            }
          </ul>
        </div>
      </div>
    </>
  );
};
