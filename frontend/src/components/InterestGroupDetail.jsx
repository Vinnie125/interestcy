import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function InterestGroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch(`/groups/${id}`);
      const data = await response.json();
      setGroup(data);
    };

    fetchGroup();
  }, [id]);

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <Link to={`/groups/${id}/create-post`}>Create New Post</Link>
      <ul>
        {group.posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InterestGroupDetail;
