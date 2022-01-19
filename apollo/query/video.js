import { gql } from "@apollo/client";

export const GET_VIDEO = gql`
	query getVideo($id: ID) {
		getVideo(id: $id) {
			url
			title
			description
			likes
			views
			createdAt
			author {
				profilePic
				subscribers
				username
			}
		}
	}
`;
