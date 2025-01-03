import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert2";
import PostService from "../services/post.service";
import Editor from "../components/Editor";
import { useAuthContext } from "../context/AuthContext";

const Edit = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [post, setPost] = useState({
    title: "",
    summary: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          if (user.id !== response.data.author._id) {
            navigate("/");
          }
          setPost(response.data);
          setContent(response.data.content);
        }
      } catch (error) {
        swal.fire({
          title: "Error",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPost({ ...post, [name]: e.target.files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPost({ ...post, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", post.title);
      data.append("summary", post.summary);
      data.append("content", post.content);
      if (post.file) {
        data.append("file", post.file);
      }

      const response = await PostService.updatePostById(id, data);

      if (response.status === 200) {
        swal
          .fire({
            title: "Update Post",
            text: "Post updated successfully",
            icon: "success",
          })
          .then(() => {
            navigate(`/post/${id}`); // Redirect to the updated post
          });
      }
    } catch (error) {
      swal.fire({
        title: "Update Post",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-semibold text-gray-700"
          >
            Summary
          </label>
          <textarea
            name="summary"
            value={post.summary}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
            placeholder="Write a short summary"
            rows="3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-semibold text-gray-700"
          >
            Content
          </label>
          <div className="64">
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-semibold text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;