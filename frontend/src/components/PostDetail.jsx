import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    const response = await fetch(`/posts/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.message === 'Post liked successfully') {
      setPost(prevPost => ({ ...prevPost, likes: prevPost.likes + 1 }));
    } else {
      alert(data.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/posts/${id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: commentContent })
    });
    const data = await response.json();
    if (data.message === 'Comment added successfully') {
      setPost(prevPost => ({ ...prevPost, comments: [...prevPost.comments, data.comment] }));
      setCommentContent('');
    } else {
      alert(data.message);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like ({post.likes})</button>
      <h3>Comments</h3>
      <ul>
        {post.comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default PostDetail;
