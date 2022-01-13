import Login from '../login';
import {Navbar, Nav, Container, Form, FormControl, Button} from 'react-bootstrap';

function Topnav() {
    return(
        <Navbar bg="danger" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Youtube</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="mx-4"
                    aria-label="Search"
                    />
                    <Button variant="outline-light">Search</Button>
                </Form>
                <Nav.Link href="/page/upload">Upload</Nav.Link>
                <Login />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Topnav