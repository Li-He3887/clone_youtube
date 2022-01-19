import { gql } from "@apollo/client";

export const GET_ME = gql`
	query getMe {
		getMe {
			id
			username
			mail
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
			mail
			profilePic
			bannerPic
			subscribers
			subscribings
		}
	}
`;
