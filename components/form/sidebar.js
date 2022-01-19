import Link from "next/link";
import {
    IoHomeOutline,
    IoPlayOutline, 
    IoListSharp, 
    IoHeartOutline, 
    IoRadioOutline
} from 'react-icons/io5';
import {RiVideoUploadLine} from 'react-icons/ri';
import {Navbar, Nav, Container} from 'react-bootstrap';


function Sidebar() {
    return(
        <div>
            <Navbar>
                <Container>
                    <Nav 
                        defaultActiveKey="/" 
                        className="
                        flex-column 
                        d-flex
                        justify-content-center 
                        gap-2
                        fs-5"
                    >
                        <Link href="/" className="icons">
                            <a>
                                <IoHomeOutline />
                                Home
                            </a>
                        </Link>

                        <Link href="/page/myvideo">
                            <a>
                                <IoPlayOutline />
                                My Videos
                            </a>
                        </Link>

                        <Link href="/page/live">
                            <a>
                                <IoRadioOutline />
                                Live
                            </a>
                        </Link>

                        <Link href="/page/upload">
                            <a>
                                <RiVideoUploadLine />
                                Upload
                            </a>
                        </Link>

                        <hr className="text-white"/>
                        
                        <Link href="/page/subscriptions">
                            <a>
                                <IoListSharp />
                                Subscriptions
                            </a>
                            
                        </Link>
                        <Link href="/page/like">
                            <a>
                                <IoHeartOutline  />
                                Likes
                            </a>
                            
                        </Link>

                        <hr className="text-white"/>

                        <Link href="/">Logout</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Sidebar