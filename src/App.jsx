import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Predict from './components/Predict';
import Home from './components/Home';
import PredictionResult from './components/PredictionResult';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/predict"
            element={isAuthenticated ? <Predict /> : <Navigate to="/login" />}
          />
          <Route path="/prediction-result" element={<PredictionResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;