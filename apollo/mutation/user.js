import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
	mutation updateUser($user: UserInput) {
		updateUser(user: $user) {
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

export const DELETE_USER = gql`
	mutation deleteUser {
		deleteUser {
			username
		}
	}
`;

export const SUBSCRIBE = gql`
  mutation subscribe(userId: ID) {
    subscribe(userId:$userId) {
      subscribings
    }
  }
`;

export const UNSUBSCRIBE = gql`
	mutation unsubscribe($userId: ID) {
		unsubscribe(userId: $userId) {
			subscribings
		}
	}
`;
