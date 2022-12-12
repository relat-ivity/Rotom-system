import './App.css';
import LoginPage from './Pages/login/LoginPage';
import MainPage from './Pages/main/main';
import {HashRouter as Router, Route, Navigate, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/login/*' element={<LoginPage />} />
            <Route path='/main:id:password' element={<MainPage />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>      
        </Router>
    </div>
  );
}

export default App;
