import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Components/postComponent/Post';
import UpdatePosts from './Components/updatePostComponent/UpdatePost';
import CreatePosts from './Components/CreatePostComponent/CreatePost';
import Login from './Components/loginComponent/LoginComponent';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/create' element={<CreatePosts />} />
          <Route path='/update/:id' element={<UpdatePosts />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
