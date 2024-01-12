// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react'
import UserContext from '../UserContext'
import '../styles/Navbar.css';


export default function AppNavbar(){



	const {user} = useContext(UserContext);

	return(
		    <Navbar expand="lg" className="bg-body-tertiary">
		      <Container fluid>
		        <Navbar.Brand as={NavLink} to="/">Sana Mall</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        { (user.id)?
                        	<>
            	            	<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
            	            </>
                        	:
                        	<>
            	            	<Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            	            	<Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        	</>
                    	}

		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
		)
}