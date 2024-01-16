import { Container, Nav, Navbar, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import ViewCart from './ViewCart';
import '../styles/Navbar.css';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (

  <Navbar expand="lg" className="bg-body-tertiary navbar" fixed="top">
  <Container fluid>
    <div className="d-flex justify-content-between w-100 align-items-center">
      {/* Left Section */}
      <div className="brand-section ms-3">
        <Navbar.Brand as={NavLink} to="/" className="brand-link">
          Commandog
        </Navbar.Brand>
      </div>

      {/* Middle Section */}
      <div className="search-section mx-3">
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="mr-2 flex-grow-1" aria-label="Search" />
        </Form>
      </div>

      {/* Right Section (Dropdown for Small Screens) */}
      <div className="links-section me-3">
        {/* Dropdown for Small Screens */}
        <NavDropdown title="Menu" id="basic-nav-dropdown" className="d-lg-none" drop="start">

            <NavDropdown.Item as={NavLink} to="/" className="nav-link">
              Home
            </NavDropdown.Item>
            {user.isAdmin ? (
              <NavDropdown.Item as={NavLink} to="/shop" className="nav-link">
              Admin Dashboard
            </NavDropdown.Item>
            ):(
              <NavDropdown.Item as={NavLink} to="/shop" className="nav-link">
              Shop
            </NavDropdown.Item>
            )}
            {user.id ? (
              <>
                <ViewCart />
                <NavDropdown.Item as={NavLink} to="/logout" className="nav-link">
                  Logout
                </NavDropdown.Item>
              </>

            ) : (
              <>
                <NavDropdown.Item as={NavLink} to="/login" className="nav-link">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/register" className="nav-link">
                  Register
                </NavDropdown.Item>
              </>
            )}

        </NavDropdown>

        {/* Regular Links for Medium to Extra-Large Screens */}
        <Nav className="d-none d-lg-flex ms-auto">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            Home
          </Nav.Link>
          {user.isAdmin ? (
              <Nav.Link as={NavLink} to="/shop" className="nav-link">
              Admin Dashboard
            </Nav.Link>
            ):(
              <Nav.Link as={NavLink} to="/shop" className="nav-link">
              Shop
            </Nav.Link>
            )}
          {user.id ? (
            <>
              <ViewCart />
              <Nav.Link as={NavLink} to="/logout" className="nav-link">
                Logout
              </Nav.Link>
            </>

          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className="nav-link">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </div>
  </Container>
</Navbar>
);
}
