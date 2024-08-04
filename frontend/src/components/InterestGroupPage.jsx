import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as axios from 'axios';
import postData from '../../../backend/src/post.json';

function InterestGroupPage() {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const { groupId } = useParams();
 
  const navigate = useNavigate();
  const base = `http://127.0.0.1:7002/groups/${groupId}`;

  useEffect(() => {
    // 设置帖子数据
    const loadPosts =async () => {
      const response = await axios.default.get(`http://127.0.0.1:7002/groups/${groupId}`);
      const comments= response.data.data ;
      //alert(JSON.stringify(response.data))
      const loadedPosts = postData.map(post => ({
        user: {
          username: post.name,
          avatar: post.url,
        },
        content: post.content,
        comments: comments.filter(comment => comment.postId === comments.id), 
      }));
      setPosts(loadedPosts);
    };

    loadPosts();
  }, [groupId]);

  const handleCommentChange = (postId, e) => {
    setCommentInput({ ...commentInput, [postId]: e.target.value });
  };

  const handleCommentSubmit = async (postId) => {
    const newComment = {
      content: commentInput[postId],
    };
    //alert(JSON.stringify(newComment))
    try {
      await axios.default.post(`${base}/${postId}`, newComment);
      
      setPosts((prevPosts) =>
        prevPosts.map((post, index) =>
          index === postId
            ? {
                ...post,
                comments: [...post.comments, newComment],
              }
            : post
        )
      );

      setCommentInput({ ...commentInput, [postId]: '' });
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/my-groups')}
          className="text-white hover:underline"
        >
          返回
        </button>
        <h1 className="text-gray-700 text-2xl font-bold">帖子</h1>
        <button
          onClick={() => navigate(`/groups/activity`)}
          className="text-white hover:underline"
        >
          查看用户活跃度
        </button>
        <button
          onClick={() => navigate('/createpost')}
          className="text-white hover:underline"
        >
          发帖
        </button>
        
      </div>
      <div className="max-w-4xl mx-auto mt-6 h-[calc(100vh-100px)] overflow-y-auto">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">没有帖子</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-pink-100 shadow-md rounded-lg mb-4 p-4"
            >
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-500 text-lg">{post.user.username}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <img
                  src={post.user.avatar}
                  alt="avatar"
                  className="object-cover mb-4"
                />
                <div className="comments-section">
                  {post.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} className="text-blue-400 comment bg-gray-100 p-2 rounded-lg mb-2">
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  <div className="comment-input-section flex mt-2">
                    <input
                      type="text"
                      placeholder="输入评论..."
                      value={commentInput[index] || ''}
                      onChange={(e) => handleCommentChange(index, e)}
                      className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={() => handleCommentSubmit(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      提交
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InterestGroupPage;
