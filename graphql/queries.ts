import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
	query GetAll {
		getPostList {
			body
			created_at
			id
			image
			title
			subreddit_id
			username
			comments {
				created_at
				id
				post_id
				text
				username
			}
			subreddit {
				created_at
				id
				topic
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
	query GetSome($topic: String!) {
		getPostListByTopic(topic: $topic) {
			body
			created_at
			id
			image
			title
			subreddit_id
			username
			comments {
				created_at
				id
				post_id
				text
				username
			}
			subreddit {
				created_at
				id
				topic
			}
			votes {
				created_at
				id
				post_id
				upvote
				username
			}
		}
	}
`;

export const GET_SUBREDDIT_BY_TOPIC = gql `
	query GetByTopic ($topic: String!) {
		getSubredditListByTopic(topic: $topic) {
			id
			created_at
			topic
		}
	}
`