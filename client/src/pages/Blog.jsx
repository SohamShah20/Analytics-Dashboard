import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api/blog";
import { logUsage } from "../api/usage";
import { useAuth } from "../context/AuthContext";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    logUsage("PAGE_VIEW", { page: "Blog" });
    fetchPosts().then(setPosts);
  }, []);

  const handleCreate = async () => {
    const post = await createPost(title, content);
    logUsage("BLOG_POST_CREATED", { postId: post._id });
    setPosts([post, ...posts]);
    setTitle("");
    setContent("");
  };

return (
  <div className="card">
    <h2>Blog</h2>

    {user?.role === "admin" && (
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button onClick={handleCreate}>Create Post</button>
      </div>
    )}

    {posts.map((post) => (
      <div key={post._id} style={{ marginBottom: "1rem" }}>
        <h3
            onClick={() =>
              logUsage("BLOG_POST_VIEWED", { postId: post._id })
            }
          >{post.title}</h3>
        <p style={{ color: "#374151" }}>{post.content}</p>
      </div>
    ))}
  </div>
);

}
