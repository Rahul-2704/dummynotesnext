import { CardComponent } from "@/components/Card";
import { Metadata } from "next";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function Page() {
  const simulateNetworkDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await simulateNetworkDelay(2000);

  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  return (
    <main>
      {/* Header Part */}
      <header className="p-4 ml-4">
        <h2 className="font-bold text-4xl border-b-2 border-black-800 text-gray-900">
          Posts
        </h2>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {posts.map((post: Post) => (
          <CardComponent
            key={post.id}
            userId={post.userId}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Posts",
  description: "Get All Posts Here",
};
