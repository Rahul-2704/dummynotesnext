import { ResolvingMetadata, Metadata } from "next";
import { Params } from "next/dist/server/request/params";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Props = { params: { postId: string } };

export default async function PostDetails({ params }: { params: Params }) {
  const id = (await params).postId;
  const postIdNumber = parseInt(id);
  const post_res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postIdNumber}`
  );
  if (!post_res.ok) {
    notFound();
  }
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postIdNumber}`
  ).then((res) => res.json());
  const userId = post.userId;
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((res) => res.json());
  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postIdNumber}/comments`
  ).then((res) => res.json());

  return (
    <>
      {
        <main>
          {
            <header className="p-4 ml-4 border-b-2 border-black-800">
              <a href="\posts" className="text-gray-900">
                <button className="mr-2">{"\u2190 "}</button>Go Back To All
                Posts
              </a>
            </header>
          }
          {/* add post desc (suggetion) */}
          <div>
            {post && (
              <div className="border-b-2 border-black-500 p-2 ml-4">
                <h1 className="text-bold text-4xl mb-2">{post.title}</h1>
                <h1 className="text-1xl text-gray-500">{post.body}</h1>
              </div>
            )}
          </div>
          {/* comments section will be here */}
          {
            <div className="p-2 ml-4">
              <h2 className="text-2xl font-semibold mb-2 ">Comments</h2>
              {/* {comments.length === 0 && <p>No comments available.</p>} */}
              <Suspense fallback={<div>Loading....</div>}>
                <ul className="space-y-4">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="p-4 border border-gray-300 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold">{comment.name}</p>
                      <p className="italic text-gray-600">{comment.email}</p>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              </Suspense>
            </div>
          }
          {/* user section here */}
          {/* user details of post creator */}
          {user && (
            <div className="mb-4 p-4 border-t-2 border-black-400 ml-4">
              <h2 className="text-2xl font-semibold">Uploaded By</h2>
              <div className="flex space-x-4 p-2">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Address:</strong> {user.address.street},{" "}
                  {user.address.city}
                </p>
              </div>
            </div>
          )}
        </main>
      }
    </>
  );
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).postId;
  const postIdNumber = parseInt(id);
  console.log(id);
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postIdNumber}`
  ).then((res) => res.json());
  console.log("postdetail", post);
  return {
    title: post.title,
    description: `Get Data for post with Id ${id}`,
  };
}
