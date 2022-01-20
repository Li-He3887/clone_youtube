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
<<<<<<< HEAD
	mutation updateVideo($id: ID, $video:VideoInput) {
		updateVideo(id:$id, video:$video){
=======
	mutation updateVideo($id: ID, $video: VideoInput) {
		updateVideo(id: $id, video: $video) {
>>>>>>> a3a948727c07c7f051b319b04c2da5d49f6b2ea0
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
