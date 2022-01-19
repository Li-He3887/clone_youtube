import Link from "next/link";
import {
	IoHomeOutline,
	IoPlayOutline,
	IoListSharp,
	IoHeartOutline,
	IoRadioOutline,
} from "react-icons/io5";
import { Navbar, Nav, Container } from "react-bootstrap";

function Sidebar() {
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
}

export default Sidebar;
