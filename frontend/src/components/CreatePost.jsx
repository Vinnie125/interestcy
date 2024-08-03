import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as axios from 'axios';

function CreateGroup() {
  const [groupInfo, setGroupInfo] = useState({id:0, name: '', content: '', url: ''});
  const navigate = useNavigate();
  const { groupId } = useParams();
  const client = axios.default;
  const base = "http://127.0.0.1:7002/api/createpost"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    client.post(base,{
      id: groupInfo.id,
      name: groupInfo.name,
      content: groupInfo.content,
      url: groupInfo.url
    })
    .then((response) => {
      response.data;
      console.log(response.data);
      
      if (response.data.success) {
        alert('发布成功!');
        navigate('/my-groups');
      } else {
        alert('发布失败: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div className="text-gray-700 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">发帖</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-semibold mb-1">帖子ID</label>
            <input
              type="number"
              name="id"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入帖子ID"
              value={groupInfo.id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">用户名</label>
            <input
              type="text"
              name="name"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入用户名"
              value={groupInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">帖子内容</label>
            <textarea
              name="content"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入帖子内容"
              value={groupInfo.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">图片链接</label>
            <input
              type="text"
              name="url"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入图片链接"
              value={groupInfo.url}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            发布
          </button>
        </form>
      </div>
    </div>
  );
}


export default CreateGroup;

