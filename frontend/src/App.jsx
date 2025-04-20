import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PoliticianArticle from "./Pages/PoliticianArticle";
import Footer from "./Components/Footer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/politician/:name" element={<PoliticianArticle />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
