import React from "react";
const baseURL = import.meta.env.VITE_PIC_URL;
import { format } from "date-fns";

const Post = ({ title, author, summary, cover, createdAt, _id }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 w-4/5 mx-auto transition-transform duration-300 hover:scale-105">
      {/* Cover Image */}
      <a href={`/post/${_id}`} className="block">
        <img
          src={`${baseURL}/${cover}`}
          alt={title}
          className="w-full h-60 object-cover"
        />
      </a>

      {/* Content */}
      <div className="p-6">
        <a href={`/post/${_id}`} className="hover:underline">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 break-words overflow-hidden w-full">
            {title}
          </h2>
        </a>

        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-medium text-blue-500">{author.username}</span> on{" "}
          {format(createdAt, "dd MMMM yyyy HH:mm")}
        </p>
        <p className="text-gray-700 line-clamp-3 mb-6">{summary}</p>

        {/* Read More Button */}
        <a
          href={`/post/${_id}`}
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Post;
