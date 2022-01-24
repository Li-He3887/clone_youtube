import { useState, useEffect } from "react";
import { GET_VIDEOS } from "../apollo/query/video";
import { useQuery } from "@apollo/client";
import { CardGroup, Card } from "react-bootstrap";

function Home() {
	const { loading, error, data } = useQuery(GET_VIDEOS);
	const [videos, setVideo] = useState([]);

	useEffect(() => {
		if (data) setVideo(data.getVideos);
		console.log(data);
	}, [data]);

	return (
		<CardGroup className="py-4 px-2">
			{videos.map(video => (
				<Card bg="dark" border="secondary" key={video.id}>
					<Card.Img
						variant="top"
						src="https://res.cloudinary.com/dxbi9mcea/video/upload/v1641950155/samples/sea-turtle.jpg"
					/>
					<Card.Body>
						<Card.Title>{video.title}</Card.Title>
					</Card.Body>
				</Card>
			))}

			{/* <Card bg="dark" border="secondary">
        <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22242%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20242%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e47c9e268%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e47c9e268%22%3E%3Crect%20width%3D%22242%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2291.453125%22%20y%3D%2286.45%22%3E242x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
        </Card.Body>
      </Card>
      
      <Card bg="dark" border="secondary">
        <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22242%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20242%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e47c9e268%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e47c9e268%22%3E%3Crect%20width%3D%22242%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2291.453125%22%20y%3D%2286.45%22%3E242x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
        </Card.Body>
      </Card> */}
		</CardGroup>
	);
}

export default Home;
