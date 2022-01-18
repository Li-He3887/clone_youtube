import Login from '../login';
import Sidebar from './Sidebar';
import {
    Navbar, 
    Nav, 
    Container, 
    Form, 
    FormControl, 
    Button,
    Offcanvas
} from 'react-bootstrap';

function Topnav() {
    return(
        <Navbar bg="dark" variant="dark"expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Sidebar />
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Brand href="/" className="mx-auto">Youtube</Navbar.Brand>
                
                <Form className="d-flex justify-content-center m-auto">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="mx-3"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

                <Nav
                    className="m-auto my-2 my-lg-4"
                    style={{ maxHeight: '100px', display: 'flex'}}
                >
                    <Nav.Link href="/page/upload">Upload</Nav.Link>
                    <Nav.Link href="/page/myvideo">My video</Nav.Link>
                </Nav>
                <Login />
            </Container>
        </Navbar>
    )
}

export default Topnav