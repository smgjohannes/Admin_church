import React, { useState, useEffect } from 'react';
import './Updatepost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [short_description, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [overlay_text, setOverlayText] = useState('');
  const [status, setStatus] = useState('');
  const [selectedImages, setSelectedImages] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing post data to populate the form
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4343/api/v1/posts/${id}`
        );
        const post = response.data;
        setTitle(post.title);
        setShortDescription(post.short_description);
        setDescription(post.description);
        setOverlayText(post.overlay_text);
        setStatus(post.status);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', short_description);
    formData.append('description', description);
    formData.append('overlay_text', overlay_text);
    formData.append('status', status);
    if (selectedImages) {
      formData.append('images', selectedImages);
    }

    try {
      await axios.patch(`http://127.0.0.1:4343/api/v1/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/posts');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create-post'>
      <div className='create-post-form'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <h2>Update A Post</h2>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
                value={title}
                placeholder='Enter Title'
                className='form-control'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='short_description'>Short Description</label>
              <input
                type='text'
                id='short_description'
                value={short_description}
                placeholder='Enter Short Description'
                className='form-control'
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                id='description'
                value={description}
                placeholder='Enter Description'
                className='form-control'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='overlay_text'>Overlay Text</label>
              <input
                type='text'
                id='overlay_text'
                value={overlay_text}
                placeholder='Enter Overlay Text'
                className='form-control'
                onChange={(e) => setOverlayText(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <input
                type='text'
                id='status'
                value={status}
                placeholder='Enter status "draft or published"'
                className='form-control'
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Images</label>
              <div className='file-upload'>
                <label htmlFor='image' className='file-upload-label'></label>
                <input
                  type='file'
                  id='image'
                  accept='image/*'
                  multiple
                  className='file-upload-input'
                  onChange={(event) => setSelectedImages(event.target.files[0])}
                />
              </div>
            </div>
          </div>
          <button className='submit-button'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
