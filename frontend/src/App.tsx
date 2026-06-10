import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;