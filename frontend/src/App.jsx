import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import TalkWithDoctor from './pages/TalkWithDoctor';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analyze" 
              element={
                <ProtectedRoute>
                  <Analyze />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/talk-with-doctor" 
              element={
                <ProtectedRoute>
                  <TalkWithDoctor />
                </ProtectedRoute>
              } 
            />
            <Route
             path="/about" 
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } 
             />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
