import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import PostBox from "../components/PostBox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
	const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
		variables: {
			limit: 10,
		},
	});

	const subreddits: Subreddit[] = data?.getSubredditListLimit

	return (
		<div className="max-w-5xl mx-auto my-7">
			<Head>
				<title>Reddit</title>
			</Head>

			<PostBox />

			<div className="flex">
				<Feed />

				<div className="sticky mx-5 top-36 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
					<p className="p-4 pb-3 mb-1 font-bold text-md">
						Top Communities
					</p>

					<div>
						{subreddits?.map((subreddit, i) => (
							<SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
