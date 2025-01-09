"use client";
import { useRouter } from "next/navigation";
interface CardProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const CardComponent: React.FC<CardProps> = ({
  userId,
  id,
  title,
  body,
}) => {
  const router = useRouter();
  const routeChange = () => {
    let path = `/posts/${id}`;
    router.push(path);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      console.log("pressed");
      event.preventDefault();
      routeChange();
    }
  };
  return (
    <div
      onClick={routeChange}
      onKeyDown={handleKeyDown}
      tabIndex={1}
      role="buton"
      className="max-w-sm rounded-lg border border-gray-300 shadow-lg p-6 m-4 cursor-pointer hover:bg-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{body}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span className="italic">User ID: {userId}</span>
        <span className="italic">Post ID: {id}</span>
      </div>
    </div>
  );
};
