import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as axios from 'axios';

function CreateGroup() {
  const [groupInfo, setGroupInfo] = useState({ name: '', description: '', location: '' ,members:''});
  const navigate = useNavigate();
  const client = axios.default;
  const base = "http://127.0.0.1:7002/groups/create-group"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupInfo({ ...groupInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    client.post(base,{
      name: groupInfo.name,
      description:groupInfo.description,
      location: groupInfo.location,
      members: groupInfo.members
    })
    .then((response) => {
      response.data;
      console.log(response.data);
      
      if (response.data.success) {
        alert('创建成功!');
        navigate('/my-groups');
      } else {
        alert('创建失败: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div className="text-gray-700 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">创建兴趣圈</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">兴趣圈名称</label>
            <input
              type="text"
              name="name"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入兴趣圈名称"
              value={groupInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">描述</label>
            <textarea
              name="content"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入兴趣圈描述"
              value={groupInfo.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">位置</label>
            <input
              type="text"
              name="url"
              className="text-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入位置"
              value={groupInfo.location}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          创建
          </button>
        </form>
      </div>
    </div>
  );
}


  

export default CreateGroup;
