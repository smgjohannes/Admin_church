import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './post.css';
import { Link } from 'react-router-dom';

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:4343/api/v1/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:4343/api/v1/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='post-container'>
      <div className='post-title'>List for Post</div>
      <Link to='/create' className='add-button'>
        Add +
      </Link>
      <div className='post-content'>
        <table className='post-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short_description</th>
              <th>Overlay_text</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((data, i) => (
              <tr key={i}>
                <td>{data.title}</td>
                <td>{data.short_description}</td>
                <td>{data.overlay_text}</td>
                <td>{data.status}</td>
                <td>
                  <Link to={`/update/${data.id}`} className='update-button'>
                    Update
                  </Link>
                  <button
                    className='delete-button'
                    onClick={() => handleDelete(data.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Post;
