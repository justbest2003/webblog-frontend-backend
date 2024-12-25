import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { format } from "date-fns";
import { useNavigate } from "react-router";
const baseURL = import.meta.env.VITE_PIC_URL;

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await PostService.deleteById(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the post. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  if (!postDetail) {
    return <div>Not Found</div>;
  }
  return (
    <div className="post-page min-h-full min-w-full flex justify-center items-center p-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-grey-800 text-center">
          {postDetail.title}
        </h1>
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">
            {format(postDetail.createdAt, "dd MMMM yyyy HH:mm")}
          </time>
          <div className="author mb-2">
            <span className="text-blue-500">@{postDetail.author.username}</span>
          </div>
        </div>
        {user.id === postDetail.author._id && (
          <div className="edit-row mb-4 text-center flex items-center justify-center gap-4">
            <a href={`/edit/${postDetail._id}`} className="btn btn-warning">
              Edit Post
            </a>
            <button
              className="btn btn-error"
              onClick={() => handleDelete(postDetail._id)}
            >
              Delete Post
            </button>
          </div>
        )}
        <img
          src={`${baseURL}/${postDetail.cover}`}
          alt={postDetail.title}
          className="w-full h-64 object-cover mb-4"
        />
        <p className="text-lg mb-4">{postDetail.summary}</p>
        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostDetail;
