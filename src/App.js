import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimeSeriesChart from './TimeSeriesChart';
import Dashboard from './Dashboard'; 
function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<TimeSeriesChart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
