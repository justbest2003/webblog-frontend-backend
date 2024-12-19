import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: "",
  });

  const navigate = useNavigate();

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

      const response = await PostService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Post created successfully.",
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: "",
          });
        });

        navigate("/");
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
      <h1 className="text-3xl font-bold text-center mb-6">Create New Post</h1>
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
          <ReactQuill
            value={postDetail.content}
            onChange={(value) =>
              setPostDetail({ ...postDetail, content: value })
            }
            placeholder="Write the content of your post"
            className="mt-2 border border-gray-300 rounded-md"
            theme="snow"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                [{ align: [] }],
                ["image"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-lg font-semibold text-gray-700"
          >
            Upload Image
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
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
