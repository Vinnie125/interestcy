import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as axios from 'axios';
import './MyInterestGroups.css';

function MyInterestGroups() {
  const [myInterestGroups, setMyInterestGroups] = useState([]);
  
  const navigate = useNavigate();
  const base = "http://127.0.0.1:7002/groups/my-groups"

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const response = await axios.default.get(base);

        if (response.data.success) {
          setMyInterestGroups(response.data.groups);
        }
        
      } catch (error) {
        console.error('获取我的兴趣圈失败', error);
      }
    };

    fetchMyGroups();
  }, []);

  return (
    <div className="interest-groups-page">
      <div className="header">
        <h1>我的圈子</h1>
      </div>
      <div className="tabs">
        <button className="tab-button" onClick={() => navigate('/groups')}>兴趣圈</button>
        <button className="tab-button active">我的圈子</button>
      </div>
      <div className="filter-bar">
        <select>
          <option>苏州市</option>
          <option>全国</option>
        </select>
        <select>
          <option>全部类型</option>
          <option>类型1</option>
          <option>类型2</option>
        </select>
      </div>
      <div className="groups-list">
        {myInterestGroups.map((group, index) => (
          <div key={index} className="group-card">
            <div className="group-info">
              <h2>{group.name}</h2>
              <p>{group.description}</p>
              <p>{group.location} | {group.members}人</p>
              <button className="view-button" onClick={() => navigate(`/groups/${index}`)}>查看</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyInterestGroups;