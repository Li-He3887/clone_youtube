import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_VIDEO } from "../../apollo/query/video";
import WatchScreen from "../../components/watchScreen";

function VideoDetails() {
	const router = useRouter();
	const { id } = router.query;
	const { data, loading } = useQuery(GET_VIDEO, {
		variables: {
			id,
		},
	});

	if (loading) return <p>Loading...</p>;
	return (
		<>
			<h1>Video</h1>
			<WatchScreen video={data.getVideo} />
		</>
	);
}

export default VideoDetails;
