import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Index from "./views/Index";
import Auth from "./views/Auth";
import Shop from "./views/Shop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
