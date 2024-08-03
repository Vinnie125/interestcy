import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as axios from 'axios';
import postData from '../../../backend/src/post.json';

function InterestGroupPage() {
  const [posts, setPosts] = useState([]);
  const { groupId } = useParams();
  const navigate = useNavigate();
  const base = `http://127.0.0.1:7002/groups/${groupId}/posts`;

  useEffect(() => {
    // 设置帖子数据
    const loadPosts = () => {
      const loadedPosts = postData.map(post => ({
        user: {
          username: post.name,
          avatar: post.url,
        },
        content: post.content,
        comments: [], // 假设目前没有评论数据
      }));
      setPosts(loadedPosts);
    };

    loadPosts();
  }, [groupId]);

  return (
    <div className="bg-gray-100">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/my-groups')}
          className="text-blue-500 hover:underline"
        >
          返回
        </button>
        <h1 className="text-gray-700 text-2xl font-bold">兴趣圈帖子</h1>
        <button
          onClick={() => navigate('/createpost')}
          className="text-blue-500 hover:underline"
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
              className="bg-white shadow-md rounded-lg mb-4 p-4 flex"
            >
              
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-500 text-lg">{post.user.username}</span>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <img
                src={post.user.avatar}
                alt="avatar"
                className="mr-4"
              />
              <button className="view-post-button" onClick={() => navigate(`/groups/${groupId}/posts/${index}`)}>查看</button>

                <div className="flex items-center text-gray-500">
                  <span className="mr-4">💬 评论</span>
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
