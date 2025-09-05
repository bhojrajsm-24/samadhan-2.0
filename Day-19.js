//task-19 of hackathon....

import React, { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const addPost = () => {
    if (!newPost.trim()) return;
    const id = Date.now();
    setPosts([{ id, text: newPost }, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setLikes({ ...likes, [id]: !likes[id] });
  };

  const addComment = (id, commentText) => {
    if (!commentText.trim()) return;
    setComments({
      ...comments,
      [id]: [...(comments[id] || []), commentText],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌐 Social Platform</h1>

      {/* New Post */}
      <div className="max-w-xl mx-auto bg-white shadow-md rounded p-4 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border p-2 rounded mb-3"
        />
        <button
          onClick={addPost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Post
        </button>
      </div>

      {/* Posts List */}
      <div className="max-w-xl mx-auto space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded p-4">
            <p className="mb-3">{post.text}</p>

            {/* Like */}
            <button
              onClick={() => toggleLike(post.id)}
              className={`px-3 py-1 rounded mr-2 ${
                likes[post.id] ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              ❤️ {likes[post.id] ? "Liked" : "Like"}
            </button>

            {/* Comments */}
            <div className="mt-3">
              <h3 className="font-semibold">Comments:</h3>
              <ul className="ml-4 list-disc">
                {(comments[post.id] || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <CommentBox onAdd={(text) => addComment(post.id, text)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Separate component for comment input
function CommentBox({ onAdd }) {
  const [comment, setComment] = useState("");

  return (
    <div className="mt-2 flex space-x-2">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="border p-2 rounded flex-grow"
      />
      <button
        onClick={() => {
          onAdd(comment);
          setComment("");
        }}
        className="bg-green-600 text-white px-3 rounded"
      >
        💬
      </button>
    </div>
  );
}

export default App;
