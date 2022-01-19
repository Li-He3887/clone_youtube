import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
	query getComments($videoId: ID) {
		getComments(videoId: $videoId) {
			id
			comment
			user
			createdAt
		}
	}
`;
