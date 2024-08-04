import React, { useEffect, useState } from 'react';
import * as axios from 'axios'

function UserActivityPage() {
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const response = await axios.default.get(`http://127.0.0.1:7002/groups/activity`);
        //alert(JSON.stringify(response.data))
        setUserActivity(response.data.data);
        
      } catch (error) {
        console.error('Failed to fetch user activity:', error);
      }
    };

    fetchUserActivity();
  }, []);

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white shadow-md p-4 mb-4">
        <h1 className="text-gray-700 text-2xl font-bold">用户活跃度</h1>
      </div>
      <div className="max-w-4xl mx-auto mt-6">
        {userActivity.length === 0 ? (
          <p className="text-center text-gray-500">没有用户活跃度数据</p>
        ) : (
          <ul>
            {userActivity.map((user, index) => (
              <li key={index} className="bg-pink-100 shadow-md rounded-lg mb-4 p-4">
                <p className="text-gray-700">
                  用户名: {user.name}, 发帖数: {user.postCount}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserActivityPage;
