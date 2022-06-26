import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import client from "../apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import Avatar from "./Avatar";

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};

type Props = {
	subreddit?: string;
};

function PostBox({ subreddit }: Props) {
	const { data: session } = useSession();
	const [addPost] = useMutation(ADD_POST, {
		refetchQueries: [GET_ALL_POSTS, "getPostList"],
	});
	const [addSubreddit] = useMutation(ADD_SUBREDDIT);
	const [imageBoxOpen, setImageBoxOpen] = useState<boolean>();
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async (formData) => {
		const notification = toast.loading("Creating new Post...");
		console.log("SUBREDDIT -1");

		try {
			const {
				data: { getSubredditListByTopic },
			} = await client.query({
				query: GET_SUBREDDIT_BY_TOPIC,
				variables: {
					topic: subreddit || formData.subreddit,
				},
			});
			console.log("SUBREDDIT 0");

			const subredditExists = getSubredditListByTopic.length > 0;
			console.log("SUBREDDIT 1");

			if (!subredditExists) {
				toast.loading(
					"Subreddit does not exist. Creating Subreddit...",
					{
						id: notification,
					}
				);
				console.log("SUBREDDIT NOEXITENT");
				const {
					data: { insertSubreddit: newSubreddit },
				} = await addSubreddit({
					variables: {
						topic: formData.subreddit,
					},
				});
				toast.loading("Subreddit created. Creating post...", {
					id: notification,
				});
				console.log(
					"CREATEING SUBREDDIT -->",
					getSubredditListByTopic[0]
				);
				console.log("Creating Post - ", formData);
				const image = formData.postImage || "";

				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						body: formData.postBody,
						image: image,
						subreddit_id: newSubreddit.id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});

				console.log(
					"NEW POST CREATED WITH NEW SUBREDDIT!!!! -->",
					newPost
				);
			} else {
				toast.loading("Found Subreddit. Creating post...", {
					id: notification,
				});
				console.log("Using subreddit: ", getSubredditListByTopic);

				const image = formData.postImage || "";

				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						body: formData.postBody,
						image: image,
						subreddit_id: getSubredditListByTopic[0].id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});

				console.log(
					"NEW POST CREATED WITH EXISTING SUBREDDIT!!!! -->",
					newPost
				);
			}
			setValue("postBody", "");
			setValue("postImage", "");
			setValue("postTitle", "");
			setValue("subreddit", "");

			toast.success("New Post Created!", {
				id: notification,
			});
		} catch (error) {
			console.log(error);

			toast.error("Whoops! Something went wrong!", {
				id: notification,
			});
		}
	});

	return (
		<form
			onSubmit={onSubmit}
			className="sticky z-50 p-2 mb-5 bg-white border border-gray-300 rounded-md top-20"
		>
			<div className="flex items-center space-x-3">
				<Avatar />

				<input
					{...register("postTitle", { required: true })}
					type="text"
					className="flex-1 p-2 pl-5 rounded-md outline-none bg-gray-50"
					placeholder={
						session
							? subreddit
							? `Create post in r/${subreddit}`
							: "Create a post by entering a title!"
							: "Sign in to post"
					}
					disabled={!session}
				/>

				<PhotographIcon
					onClick={() => setImageBoxOpen(!imageBoxOpen)}
					className={`h-6 cursor-pointer text-gray-300 ${
						imageBoxOpen && "text-blue-300"
					}`}
				/>
				<LinkIcon className="h-6 text-gray-300" />
			</div>

			{!!watch("postTitle") && (
				<div className="flex flex-col py-2">
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Body:</p>
						<textarea
							className="flex-1 w-full p-2 m-2 rounded-md outline-none h-[150px] bg-blue-50"
							{...register("postBody")}
							placeholder="Text (optional)"
						/>
					</div>

					{!subreddit && (
						<div className="flex items-center px-2">
							<p className="min-w-[90px]">Subreddit:</p>
							<input
								className="flex-1 p-2 m-2 rounded-md outline-none bg-blue-50"
								{...register("subreddit", { required: true })}
								type="text"
								placeholder="i.e. bl2"
							/>
						</div>
					)}

					{imageBoxOpen && (
						<div className="flex items-center px-2">
							<p className="min-w-[90px]">Image URL:</p>
							<input
								className="flex-1 p-2 m-2 rounded-md outline-none bg-blue-50"
								{...register("postImage")}
								type="text"
								placeholder="Image URL (optional)"
							/>
						</div>
					)}

					{Object.keys(errors).length > 0 && (
						<div className="p-2 space-y-2 text-red-500">
							{errors.postTitle?.type === "required" && (
								<p>- A post title is required!</p>
							)}
							{errors.subreddit?.type === "required" && (
								<p>- A subreddit is required!</p>
							)}
						</div>
					)}

					{!!watch("postTitle") && (
						<button
							type="submit"
							className="w-full p-2 text-white bg-blue-400 rounded-full"
						>
							Create Post
						</button>
					)}
				</div>
			)}
		</form>
	);
}

export default PostBox;
