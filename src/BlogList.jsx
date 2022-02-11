const BlogList = ({ blogs, title }) => {
    return (
        <div className="blog-preview">
            <h1>{title}</h1>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    {/* <button onClick={() => handleDelete(blog.id)}>
                        Delete this blog!
                    </button> */}
                </div>
            ))}
        </div>
    );
};

export default BlogList;
