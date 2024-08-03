import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as axios from 'axios';

function PostDetail() {
  const [post, setPost] = useState(null);
  const { groupId, postId } = useParams();
  const client = axios.default;
  const navigate = useNavigate();
  const base = `http://127.0.0.1:7002/groups/${groupId}/posts`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.get(base);
        if (response.data.success) {
          setPost(response.data.posts[postId]);
        }
      } catch (error) {
        console.error('获取帖子详情失败', error);
      }
    };

    fetchPost();
  }, [base, postId]);

  if (!post) return <div>加载中...</div>;

  return (
    <div className="text-gray-700 post-detail flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">帖子详情</h2>
        <div className="post-info space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">用户名</label>
            <p>{post.name}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">帖子内容</label>
            <p>{post.content}</p>
          </div>
            <div>
              <label className="block text-sm font-semibold mb-1">图片</label>
              <img src={post.url} alt="post" className="w-full h-auto rounded-md" />
            </div>
        </div>
        <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => navigate(-1)}>返回</button>
      </div>
    </div>
  );
}

export default PostDetail;
