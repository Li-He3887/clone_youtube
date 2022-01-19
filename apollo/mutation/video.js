import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
	mutation addVideo($title: String!, $description: String!, $url: String!) {
		addVideo(
			video: { title: $title, description: $description, url: $url }
		) {
			title
			description
			url
		}
	}
`;
