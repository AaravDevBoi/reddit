import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";

type FormData = {
	comment: string;
};

function PostPage() {
	const router = useRouter();
	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
	});
	const { data: session } = useSession();
	const { data: postByPostId } = useQuery(GET_POST_BY_POST_ID, {
		variables: {
			post_id: router.query.postId,
		},
	});

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	const post: Post = postByPostId?.getPostListByPostId;

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const notification = toast.loading("Posting your comment...");
		await addComment({
			variables: {
				post_id: router.query.postId,
				username: session?.user?.name,
				text: data.comment as string,
			},
		});

		setValue("comment", "");

		toast.success("Comment posted successfully!", {
			id: notification,
		});
	};
	return (
		<div className="max-w-5xl mx-auto my-7">
			<Head>
				<title>Post: {post?.title as string}</title>
			</Head>

			<Post post={post} postPage={true} />

			<div className="p-5 pl-16 -mt-3 bg-white border border-t-0 border-gray-300 rounded-b-md">
				<p className="text-sm">
					{!session ? "" : "Comment as"}{" "}
					<span className="text-red-500">{session?.user?.name}</span>
				</p>

				<form
					className="flex flex-col space-y-2"
					onSubmit={handleSubmit(onSubmit)}
				>
					<textarea
						{...register("comment")}
						disabled={!session}
						className="h-24 p-2 pl-4 border border-gray-200 rounded-md outline-none disabled:bg-gray-50"
						placeholder={
							!session
								? "Sign in to comment"
								: "What are your thoughts?"
						}
					/>

					<button
						type="submit"
						disabled={!session}
						className="p-3 font-semibold text-white bg-red-500 rounded-full disabled:bg-gray-200"
					>
						Comment
					</button>
				</form>

			</div>
			<div className="px-10 py-5 -my-5 bg-white border border-t-0 border-gray-300 rounded-b-md">
					<hr className="py-2" />

					{post?.comments?.map((comment) => (
						<div
							key={comment.id}
							className="relative flex items-center space-x-2 space-y-5"
						>
							<hr className="absolute z-0 h-20 border left-7 top-12" />

							<div className="z-50">
								<Avatar seed={comment.username} />
							</div>

							<div className="flex flex-col p-2">
								<p className="py-2 text-xs text-gray-400">
									<span className="font-semibold text-gray-600">
										{comment.username}
									</span>{" "}
									• Posted at{" "}
									<TimeAgo date={comment.created_at} />
								</p>
								<p>{comment.text}</p>
							</div>
						</div>
					))}
				</div>
		</div>
	);
}

export default PostPage;
