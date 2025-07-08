import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViewProjects from './components/ViewProjects';
import EditProject from './components/EditProject';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/view-projects" element={<ViewProjects/>} />
          <Route path="/edit/:projectId" element={<EditProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
