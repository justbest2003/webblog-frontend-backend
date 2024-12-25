import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import Editor from "../components/Editor";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await PostService.getPostById(id);
        const post = response.data;
        setPostDetail({
          title: post.title,
          summary: post.summary,
          content: post.content,
          file: null,
        });
        setContent(post.content);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to load post data.",
          icon: "error",
        });
      }
    };

    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      if (postDetail.file) {
        data.set("file", postDetail.file);
      }

      const response = await PostService.updatePost(id, data);

      if (response.status === 200) {
        Swal.fire({
          title: "Update Post",
          text: "Post updated successfully.",
          icon: "success",
        }).then(() => {
          navigate(`/`);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Post</h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            value={postDetail.title}
            onChange={handleChange}
            placeholder="Enter the post title"
            required
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-lg font-semibold text-gray-700"
          >
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            value={postDetail.summary}
            onChange={handleChange}
            placeholder="Write a short summary"
            rows="3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-semibold text-gray-700"
          >
            Content
          </label>
          <div className="">
            <Editor value={postDetail.content} ref={editorRef} />
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-lg font-semibold text-gray-700"
          >
            Upload Image (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Update Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
