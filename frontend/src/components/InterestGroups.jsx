import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InterestGroups.css';

const interestGroups = [
  { id: 1, name: '窝尔沃兴趣圈', description: '发现更多美好生活', location: '全国', members: 90},
  { id: 2, name: '窝尔钓鱼趣', description: '全国', location: '全国', members: 35 },
  { id: 3, name: '懒洋洋', description: '和懒洋洋一起长大', location: '全国', members: 350 },

];

function InterestGroups() {
  const navigate = useNavigate();

  return (
    <div className="interest-groups-page h-[calc(100vh-100px)] overflow-y-auto">
      <div className="header">
        <h1>发现圈子</h1>
        <button className="create-button" onClick={() => navigate('/create-group')}>创建</button>
      </div>
      <div className="tabs">
        <button className="tab-button active">兴趣圈</button>
        <button className="tab-button" onClick={() => navigate('/my-groups')}>我的圈子</button>
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
        {interestGroups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-info">
              <h2>{group.name}</h2>
              <p>{group.description}</p>
              <p>{group.location} | {group.members}人</p>
              <button className="join-button">加入</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterestGroups;
