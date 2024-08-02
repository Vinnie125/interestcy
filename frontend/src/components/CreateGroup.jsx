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
    <div className="create-group-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="兴趣圈名称"
          value={groupInfo.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="描述"
          value={groupInfo.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="位置"
          value={groupInfo.location}
          onChange={handleChange}
          required
        />
        <button type="submit">创建</button>
      </form>
    </div>
  );
}

export default CreateGroup;
