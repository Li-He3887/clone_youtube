import Login from "../login";
import Sidebar from "./Sidebar";
import { TOKEN_NAME } from "../../vars/token";
import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    Button,
    Offcanvas,
} from "react-bootstrap";

function Topnav() {
<<<<<<< HEAD
    return (
        <Navbar bg="dark" variant="dark" expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    style={{ background: "black" }}
                >
                    <Offcanvas.Header>
                        <Offcanvas.Title className="fs-3" id="offcanvasNavbarLabel">Youtube</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Sidebar />
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Brand href="/" className="mx-3">Youtube</Navbar.Brand>

                <Form className="d-flex justify-content-center mx-auto">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mx-3"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

                <Button variant="danger" style={{marginRight: "40px"}}>Go Live</Button>

                {(typeof window !== "undefined") &&
                    (localStorage.hasOwnProperty(TOKEN_NAME) ?
                            <div>hi</div>
                        :
                        <Login />
                    )}
            </Container>
        </Navbar>
    )
=======
	return (
		<Navbar bg="dark" variant="dark" expand={false}>
			<Container fluid>
				<Navbar.Toggle aria-controls="offcanvasNavbar" />
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="start">
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id="offcanvasNavbarLabel">
							Offcanvas
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Sidebar />
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
				<Navbar.Brand href="/" className="mx-auto">
					Youtube
				</Navbar.Brand>

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
					style={{ maxHeight: "100px", display: "flex" }}>
					<Link href="/page/upload">Upload</Link>
					{/* <Nav.Link href="/page/upload" as={Link}>
						Upload
					</Nav.Link> */}
					<Nav.Link href="/page/myvideo" as={Link}>
						My video
					</Nav.Link>
				</Nav>
				<Login />
			</Container>
		</Navbar>
	);
>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0
}

export default Topnav;
