import { gql } from "@apollo/client";

export const CHAT_SUBSCRIPTION = gql`
	subscription OnMessageCreated($roomId: ID) {
		messageCreated(roomId: $roomId) {
			id
			roomId
			message
			sender {
				username
				profilePic
			}
		}
	}
`;
