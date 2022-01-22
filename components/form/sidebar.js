import Link from "next/link";
import {
<<<<<<< HEAD
    IoHomeOutline,
    IoPlayOutline, 
    IoListSharp, 
    IoHeartOutline, 
    IoRadioOutline
} from 'react-icons/io5';
import {RiVideoUploadLine} from 'react-icons/ri';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {TOKEN_NAME} from '../../vars/token'
=======
	IoHomeOutline,
	IoPlayOutline,
	IoListSharp,
	IoHeartOutline,
	IoRadioOutline,
} from "react-icons/io5";
import { Navbar, Nav, Container } from "react-bootstrap";
>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0

function Sidebar() {
    const onSignOut = e => {
        window.google?.accounts?.id?.disableAutoSelect();
        window.localStorage.removeItem(TOKEN_NAME)
    };
	return (
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
<<<<<<< HEAD
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

                        <button style={{appearance: 'none'}} onClick={onSignOut}>Logout</button>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
=======
                        fs-5">
						<Nav.Link href="/" className="icons">
							<IoHomeOutline />
							Home
						</Nav.Link>
						<Nav.Link href="/page/watchScreen">
							<IoPlayOutline />
							Videos
						</Nav.Link>
						<Nav.Link href="/page/live">
							<IoRadioOutline />
							Live
						</Nav.Link>

						<hr className="text-black" />

						<Nav.Link href="/page/subscriptions">
							<IoListSharp />
							Subscriptions
						</Nav.Link>
						<Nav.Link href="/page/like">
							<IoHeartOutline />
							Likes
						</Nav.Link>

						<hr className="text-black" />

						<Nav.Link href="#">Logout</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0
}

export default Sidebar;
