import React, { useState } from 'react';
import './creatPost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [short_description, setShort_description] = useState('');
  const [description, setDescription] = useState('');
  const [overlay_text, setOverlay_text] = useState('');
  const [status, setStatus] = useState('');
  const [selectedImages, setSelectedImages] = useState(null);
  const navigate = useNavigate();

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
      await axios.post('http://127.0.0.1:4343/api/v1/posts', formData, {
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
        <form onSubmit={handleSubmit} enctype='multipart/form-data'>
          <h2>Add A Post</h2>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title'
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
                placeholder='Enter Short Description'
                className='form-control'
                onChange={(e) => setShort_description(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                id='description'
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
                placeholder='Enter Overlay Text'
                className='form-control'
                onChange={(e) => setOverlay_text(e.target.value)}
              />
            </div>
          </div>
          <div className='form-group-row'>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <input
                type='text'
                id='status'
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
          <button className='submit-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
