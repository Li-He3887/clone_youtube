import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
	mutation addComment($videoId: ID, $comment: String) {
		addComment(videoId: $videoId, comment: $comment) {
			id
			comment
			user
			createdAt
		}
	}
`;

export const UPDATE_COMMENT = gql`
	mutation updateComment($id: ID, $comment: String) {
		updateComment(id: $id, comment: $comment) {
			id
			comment
			user
			createdAt
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation deleteComment($id: ID) {
		deleteComment(id: $id) {
			id
			comment
		}
	}
`;
