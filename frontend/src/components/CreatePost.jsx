import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // 获取兴趣圈 ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (photo) {
      formData.append('photo', photo);
    }
    
    const response = await fetch(`/groups/${id}/posts`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.message === 'Post created successfully') {
      navigate(`/groups/${id}`); // 重定向到兴趣圈详情页面
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePost;
