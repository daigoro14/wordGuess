import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import ReadPage from "./pages/ReadPage";

export const url = process.env.REACT_APP_STORY || "http://localhost:8080";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ReadPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
