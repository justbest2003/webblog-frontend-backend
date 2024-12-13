import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post Created:", { title, summary, content, image });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
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
            value={content}
            onChange={setContent}
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
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            onChange={handleImageChange}
          />
          {image && (
            <p className="text-sm mt-2 text-gray-500">
              File selected: {image.name}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
