import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../../skeletons/PostSkeleton";
import Post from "./Post";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {

	const getPostEndPoint = () => {
		switch (feedType) {
			case "forYou":
				 return "/api/posts/all";
			 case "following":
				 return "/api/posts/following";
			 case "posts":
				 return `/api/posts/user/${username}`;
				 
			 case "likes":
				  return `/api/posts/likes/${userId}`;
			default:
				  return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndPoint();


	const { data: posts, isLoading, refetch, isRefetching } = useQuery({

		queryKey: ["posts"],

		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT);
				const data = await res.json();

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong")
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		}
	})

	useEffect(() => {
		refetch();
	},[feedType, refetch, username])


    // const isLoading = false;

  return (
      <>
              
			{isLoading && isRefetching &&  (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}

			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
      </>
  )
}

export default Posts



// import PostSkeleton from "../../skeletons/PostSkeleton";
// import { POSTS } from "../../utils/db/dummy";
// import Post from "./Post";

// const Posts = () => {
// 	const isLoading = false;

// 	return (
// 		<>
// 			{isLoading && (
// 				<div className='flex flex-col justify-center'>
// 					<PostSkeleton />
// 					<PostSkeleton />
// 					<PostSkeleton />
// 				</div>
// 			)}
// 			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
// 			{!isLoading && POSTS && (
// 				<div>
// 					{POSTS.map((post) => (
// 						<Post key={post._id} post={post} />
// 					))}
// 				</div>
// 			)}
// 		</>
// 	);
// };
// export default Posts;