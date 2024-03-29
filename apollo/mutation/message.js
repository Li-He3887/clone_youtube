import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
	mutation addMessage($message: MessageInput) {
		addMessage(message: $message) {
			id
		}
	}
`;
