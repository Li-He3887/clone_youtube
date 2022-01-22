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

export const GET_VIDEOS = gql`
	query getVideos {
		getVideos {
			id
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

export const GET_USER_VIDEOS = gql`
	query getUserVideos {
		getUserVideos {
			id
			url
			title
			description
			likes
			views
			createdAt
		}
	}
`;
