const baseURL = import.meta.env.VITE_PIC_URL;

const Post = ({ title, author, summary, cover, createdAt, _id }) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="md:1/2 flex items-center justify-center">
          <img
            src={`${baseURL}/${cover}`}
            alt="title"
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="p-6 md:1/2 flex flex-col card-body">
          <a href={"/post/" + _id} className="href">
            <h2 className="card-title">{title}</h2>
          </a>
          <h4>
            {author.username} - {createdAt}
          </h4>
          <h4>{summary}</h4>
        </div>
      </div>
    </>
  );
};

export default Post;
