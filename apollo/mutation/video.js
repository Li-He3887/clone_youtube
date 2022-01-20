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

export const UPDATE_VIDEO = gql`
	mutation updateVideo($id: ID, $video:VideoInput) {
		updateVideo(id:$id, video:$video){
			title
		}
	}
`;

export const DELETE_VIDEO = gql`
	mutation deleteVideo($id: ID) {
		deleteVideo(id: $id) {
			title
		}
	}
`;

export const INCREMENT_VIEWS = gql`
	mutation incrementViews($id: ID) {
		incrementViews(id: $id) {
			views
		}
	}
`;

export const LIKE_VIDEO = gql`
	mutation likeVideo($id: ID) {
		likeVideo(id: $id) {
			likes
			dislikes
		}
	}
`;

export const UNLIKE_VIDEO = gql`
	mutation unlikeVideo($id: ID) {
		unlikeVideo(id: $id) {
			likes
			dislikes
		}
	}
`;

export const DISLIKE_VIDEO = gql`
	mutation dislikeVideo($id: ID) {
		dislikeVideo(id: $id) {
			likes
			dislikes
		}
	}
`;

export const UNDISLIKE_VIDEO = gql`
	mutation undislikeVideo($id: ID) {
		undislikeVideo(id: $id) {
			likes
			dislikes
		}
	}
`;
