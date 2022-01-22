import { gql } from "@apollo/client";

export const GET_ME = gql`
	query getMe {
		getMe {
			id
			username
			email
			profilePic
			bannerPic
			subscribers
			subscribings
		}
	}
`;

export const GET_USER = gql`
	query getUser($id: ID) {
		getUser(id: $id) {
			id
			username
			email
			isLive
			profilePic
			bannerPic
			subscribers
			subscribings
		}
	}
`;
