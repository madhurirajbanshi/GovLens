// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import PoliticianArticle from "./Pages/PoliticianArticle";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/politician/:name" element={<PoliticianArticle />} />
      </Routes>
    </Router>
  );
}
export default App;
