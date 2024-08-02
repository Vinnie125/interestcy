import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // 引入样式文件

function HomePage() {
  const navigate = useNavigate();

  const handleExploreGroupsClick = () => {
    navigate('/login'); // 导航到登录页面
  };

  return (
    <div className="home-page">
      <div className="content">
        <h1>Welcome to the Interest Groups Platform</h1>
        <p>Your one-stop solution for finding and creating interest groups.</p>
        <button className="cta-button" onClick={handleExploreGroupsClick}>
          Explore Groups
        </button>
      </div>
    </div>
  );
}

export default HomePage;
