import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql `
	query GetByTopic ($topic: String!) {
		id
		created_at
		topic
	}
`