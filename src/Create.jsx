import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Sütike");
    const [isLoading, setIsLoading] = useState(false);

    // useNavigate - redirect the Home component (in react v 6)
    // useHistory - below react v 6

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {
            title,
            body,
            author,
        };
        setIsLoading(true);
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
        }).then(() => {
            console.log("new blog added");
            setIsLoading(false);
            // Oda visz a postFetch után ahonnan jöttél.
            // history.go(-1)
            // Oda visz amit megadok neki endpointot
            navigate("/");
        });
    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Sütike">Sütike</option>
                    <option value="Viktor">Viktor</option>
                </select>
                {!isLoading && <button>Add Blog</button>}
                {isLoading && <button disabled> Adding Blog... </button>}
            </form>
        </div>
    );
};

export default Create;
