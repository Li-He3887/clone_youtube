import {
    IoHomeOutline,
    IoPlayOutline, 
    IoListSharp, 
    IoHeartOutline, 
    IoRadioOutline
} from 'react-icons/io5';
import {Navbar, Nav, Container} from 'react-bootstrap';


function Sidebar() {
    return(
        <div className="sidebar">
            <Navbar bg="dark" variant="dark">
                <Container className="">
                    <Nav defaultActiveKey="/" className="flex-column d-flex justify-content-center alig-items-center gap-2">
                        <Nav.Link href="/" className="icons">
                            <IoHomeOutline />
                            Home
                        </Nav.Link>
                        <Nav.Link href="/page/video">
                            <IoPlayOutline />
                            Videos
                        </Nav.Link>
                        <Nav.Link href="/page/live">
                            <IoRadioOutline />
                            Live
                        </Nav.Link>

                        <hr className="text-white"/>
                        
                        <Nav.Link href="/page/subscriptions">
                            <IoListSharp />
                            Subscriptions
                        </Nav.Link>
                        <Nav.Link href="/page/like">
                            <IoHeartOutline  />
                            Likes
                        </Nav.Link>

                        <hr className="text-white"/>

                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Sidebar